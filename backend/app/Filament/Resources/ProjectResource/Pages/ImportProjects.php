<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use App\Services\ProjectImportService;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\Page;
use Illuminate\Support\Facades\Storage;

class ImportProjects extends Page
{
    protected static string $resource = ProjectResource::class;

    protected static string $view = 'filament.resources.project-resource.pages.import-projects';

    protected static ?string $title = 'Import Projects from CSV';

    protected static ?string $navigationIcon = 'heroicon-o-arrow-up-tray';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Upload Files')
                    ->description('Upload a CSV file with project data, and optionally a ZIP file containing all images referenced in the CSV.')
                    ->schema([
                        FileUpload::make('csv_file')
                            ->label('CSV File')
                            ->helperText('Download the template below, fill it in, and upload here.')
                            ->acceptedFileTypes(['text/csv', 'text/plain', 'application/csv', 'application/vnd.ms-excel'])
                            ->disk('local')
                            ->directory('imports/csv')
                            ->required(),

                        FileUpload::make('images_zip')
                            ->label('Images ZIP (optional)')
                            ->helperText('A ZIP file containing all images referenced by filename in the CSV.')
                            ->acceptedFileTypes(['application/zip', 'application/x-zip-compressed', 'application/octet-stream'])
                            ->disk('local')
                            ->directory('imports/zip'),
                    ]),

                Section::make('Column Reference')
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        Placeholder::make('columns_info')
                            ->label('')
                            ->content(implode(' | ', [
                                'name_en', 'name_ar', 'area_en', 'area_ar',
                                'location_en', 'location_ar', 'project_area_en', 'project_area_ar',
                                'mission_en', 'mission_ar', 'components_en', 'components_ar',
                                'client_en', 'client_ar', 'type', 'service',
                                'main_image', 'gallery_images (comma-separated)',
                                'show_on_homepage (0/1)', 'is_published (0/1)', 'sort_order',
                            ])),

                        Placeholder::make('type_values')
                            ->label('Valid type values')
                            ->content('housing | commercial | industrial | medical | governmental | entertainment | mosques | interior_design | support_services'),

                        Placeholder::make('service_values')
                            ->label('Valid service values')
                            ->content('architectural_design | fire_life_safety | factory_warehouses_design | building_permits_services | contract_disputes_resolution | pmo_pmc_services | projects_supervision_services | infrastructure_services'),
                    ]),
            ])
            ->statePath('data');
    }

    public function import(): void
    {
        $data = $this->form->getState();

        $csvRelPath = $data['csv_file'] ?? null;
        $zipRelPath = $data['images_zip'] ?? null;

        if (!$csvRelPath) {
            Notification::make()->danger()->title('No CSV file uploaded.')->send();
            return;
        }

        $csvAbsPath = Storage::disk('local')->path($csvRelPath);
        $zipAbsPath = $zipRelPath ? Storage::disk('local')->path($zipRelPath) : null;

        $service = new ProjectImportService();
        $result = $service->import($csvAbsPath, $zipAbsPath);

        // Cleanup uploaded files
        Storage::disk('local')->delete($csvRelPath);
        if ($zipRelPath) {
            Storage::disk('local')->delete($zipRelPath);
        }

        if ($result['fatal']) {
            Notification::make()->danger()->title('Import failed')->body($result['fatal'])->send();
            return;
        }

        $body = "Imported: {$result['imported']}, Skipped: {$result['skipped']}";
        if (!empty($result['errors'])) {
            $body .= "\n\nWarnings:\n" . implode("\n", array_slice($result['errors'], 0, 10));
            if (count($result['errors']) > 10) {
                $body .= "\n... and " . (count($result['errors']) - 10) . ' more warnings.';
            }
        }

        Notification::make()
            ->success()
            ->title("Import complete")
            ->body($body)
            ->persistent()
            ->send();

        $this->redirect(ProjectResource::getUrl('index'));
    }

    public function downloadTemplate(): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $csv = ProjectImportService::generateTemplate();

        return response()->streamDownload(function () use ($csv) {
            echo $csv;
        }, 'projects_import_template.csv', [
            'Content-Type' => 'text/csv',
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('downloadTemplate')
                ->label('Download Template')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('gray')
                ->action('downloadTemplate'),
        ];
    }
}
