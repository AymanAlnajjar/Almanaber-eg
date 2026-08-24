<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ZipArchive;

class ProjectImportService
{
    private array $errors = [];
    private int $imported = 0;
    private int $skipped = 0;

    /**
     * Import projects from a CSV file + optional ZIP of images.
     *
     * @param  string  $csvPath  Path relative to the local/temp disk
     * @param  string|null  $zipPath  Path relative to the local/temp disk
     */
    public function import(string $csvPath, ?string $zipPath = null): array
    {
        $extractDir = null;

        // Extract ZIP to a temp directory if provided
        if ($zipPath && file_exists($zipPath)) {
            $extractDir = sys_get_temp_dir() . '/project_import_' . uniqid();
            mkdir($extractDir, 0777, true);

            $zip = new ZipArchive();
            if ($zip->open($zipPath) === true) {
                $zip->extractTo($extractDir);
                $zip->close();
            } else {
                $this->errors[] = 'Could not open ZIP file.';
            }
        }

        // Parse CSV
        $handle = fopen($csvPath, 'r');
        if (!$handle) {
            return $this->result('Could not open CSV file.');
        }

        $headers = fgetcsv($handle);
        if (!$headers) {
            fclose($handle);
            return $this->result('CSV file is empty or malformed.');
        }

        // Normalize headers (trim whitespace, lowercase)
        $headers = array_map(fn($h) => strtolower(trim($h)), $headers);

        $rowNumber = 1;
        while (($row = fgetcsv($handle)) !== false) {
            $rowNumber++;
            if (count($row) !== count($headers)) {
                $this->errors[] = "Row $rowNumber: column count mismatch, skipped.";
                $this->skipped++;
                continue;
            }

            $data = array_combine($headers, $row);
            $data = array_map('trim', $data);

            // Validate required fields
            if (empty($data['name_en']) || empty($data['name_ar'])) {
                $this->errors[] = "Row $rowNumber: name_en and name_ar are required, skipped.";
                $this->skipped++;
                continue;
            }

            // Handle main image
            $mainImagePath = null;
            if (!empty($data['main_image']) && $extractDir) {
                $mainImagePath = $this->storeImage(
                    $extractDir . '/' . basename($data['main_image']),
                    'projects/main'
                );
                if (!$mainImagePath) {
                    $this->errors[] = "Row $rowNumber: main image '{$data['main_image']}' not found in ZIP.";
                }
            }

            // Handle gallery images (comma-separated filenames)
            $galleryPaths = [];
            if (!empty($data['gallery_images']) && $extractDir) {
                $imageNames = array_filter(array_map('trim', explode(',', $data['gallery_images'])));
                foreach ($imageNames as $imgName) {
                    $path = $this->storeImage($extractDir . '/' . basename($imgName), 'projects/gallery');
                    if ($path) {
                        $galleryPaths[] = $path;
                    } else {
                        $this->errors[] = "Row $rowNumber: gallery image '$imgName' not found in ZIP.";
                    }
                }
            }

            Project::create([
                'name_en'         => $data['name_en'] ?? '',
                'name_ar'         => $data['name_ar'] ?? '',
                'area_en'         => $data['area_en'] ?? '',
                'area_ar'         => $data['area_ar'] ?? '',
                'location_en'     => $data['location_en'] ?? '',
                'location_ar'     => $data['location_ar'] ?? '',
                'project_area_en' => $data['project_area_en'] ?? '',
                'project_area_ar' => $data['project_area_ar'] ?? '',
                'mission_en'      => $data['mission_en'] ?? '',
                'mission_ar'      => $data['mission_ar'] ?? '',
                'components_en'   => $data['components_en'] ?? '',
                'components_ar'   => $data['components_ar'] ?? '',
                'client_en'       => $data['client_en'] ?? '',
                'client_ar'       => $data['client_ar'] ?? '',
                'type'            => $data['type'] ?? 'housing',
                'service'         => $data['service'] ?? 'architectural_design',
                'main_image'      => $mainImagePath,
                'gallery_images'  => $galleryPaths ?: null,
                'show_on_homepage' => ($data['show_on_homepage'] ?? '0') === '1',
                'is_published'    => ($data['is_published'] ?? '1') !== '0',
                'sort_order'      => (int) ($data['sort_order'] ?? 0),
            ]);

            $this->imported++;
        }

        fclose($handle);

        // Cleanup temp extract directory
        if ($extractDir && is_dir($extractDir)) {
            $this->deleteDir($extractDir);
        }

        return $this->result();
    }

    private function storeImage(string $sourcePath, string $targetDir): ?string
    {
        if (!file_exists($sourcePath)) {
            return null;
        }

        $filename = Str::uuid() . '_' . basename($sourcePath);
        $targetPath = $targetDir . '/' . $filename;

        Storage::disk('public')->put($targetPath, file_get_contents($sourcePath));

        return 'storage/' . $targetPath;
    }

    private function deleteDir(string $dir): void
    {
        foreach (glob($dir . '/*') as $file) {
            is_dir($file) ? $this->deleteDir($file) : unlink($file);
        }
        rmdir($dir);
    }

    private function result(string $fatalError = null): array
    {
        return [
            'imported' => $this->imported,
            'skipped'  => $this->skipped,
            'errors'   => $this->errors,
            'fatal'    => $fatalError,
        ];
    }

    /**
     * Generate a CSV template string with all column headers and one example row.
     */
    public static function generateTemplate(): string
    {
        $headers = [
            'name_en', 'name_ar', 'area_en', 'area_ar', 'location_en', 'location_ar',
            'project_area_en', 'project_area_ar', 'mission_en', 'mission_ar',
            'components_en', 'components_ar', 'client_en', 'client_ar',
            'type', 'service', 'main_image', 'gallery_images',
            'show_on_homepage', 'is_published', 'sort_order',
        ];

        $example = [
            'Luxury Villa Complex', 'مجمع فلل فاخر',
            'Riyadh', 'الرياض', 'King Fahd Rd', 'طريق الملك فهد',
            '5000 sqm', '5000 متر مربع',
            'Modern luxury residential complex', 'مجمع سكني فاخر حديث',
            'Pool, gym, garden', 'مسبح وصالة رياضية وحديقة',
            'Private Developer', 'مطور خاص',
            'housing', 'architectural_design',
            'main.jpg', 'gallery1.jpg,gallery2.jpg',
            '1', '1', '10',
        ];

        $output = fopen('php://temp', 'r+');
        fputcsv($output, $headers);
        fputcsv($output, $example);
        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }
}
