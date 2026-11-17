<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use Filament\Actions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Placeholder;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;

class EditProject extends EditRecord
{
    protected static string $resource = ProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('removeGalleryImage')
                ->label('Remove gallery image')
                ->icon('heroicon-o-trash')
                ->color('danger')
                ->visible(fn (): bool => count($this->record->gallery_images ?? []) > 0)
                ->modalWidth('5xl')
                ->form([
                    Placeholder::make('galleryPreview')
                        ->label('Gallery images')
                        ->content(fn (): HtmlString => $this->galleryPreview())
                        ->columnSpanFull(),
                    Select::make('image')
                        ->label('Image to remove')
                        ->options(fn (): array => collect($this->record->gallery_images ?? [])
                            ->mapWithKeys(fn (string $path, int $index): array => [
                                $index . ':' . sha1($path) => ($index + 1) . '. ' . basename($path),
                            ])->all())
                        ->required(),
                ])
                ->requiresConfirmation()
                ->modalDescription('This removes the selected image from this project.')
                ->action(function (array $data): void {
                    $images = $this->record->gallery_images ?? [];
                    [$index, $hash] = array_pad(explode(':', $data['image'], 2), 2, '');
                    $path = $images[(int) $index] ?? null;

                    if (! ctype_digit($index) || ! $path || sha1($path) !== $hash) {
                        Notification::make()->danger()->title('Image changed. Reload and try again.')->send();
                        return;
                    }

                    unset($images[(int) $index]);
                    $this->record->update(['gallery_images' => array_values($images)]);

                    // Existing import records may contain the public URL prefix.
                    $diskPath = preg_replace('#^storage/#', '', $path);
                    Storage::disk('public')->delete($diskPath);

                    Notification::make()->success()->title('Gallery image removed.')->send();
                    $this->redirect(ProjectResource::getUrl('edit', ['record' => $this->record]));
                }),
            Actions\DeleteAction::make(),
        ];
    }

    private function galleryPreview(): HtmlString
    {
        $cards = collect($this->record->gallery_images ?? [])
            ->map(function (string $file, int $index): string {
                $path = preg_replace('#^storage/#', '', $file);
                $url = asset('storage/' . $path);
                $number = $index + 1;

                return '<div style="border:1px solid #555;border-radius:8px;overflow:hidden;">'
                    . '<a href="' . e($url) . '" target="_blank" rel="noopener noreferrer">'
                    . '<img src="' . e($url) . '" alt="Gallery image ' . $number . '" loading="lazy" style="width:100%;height:140px;object-fit:cover;">'
                    . '</a><div style="padding:8px;overflow-wrap:anywhere;font-size:12px;">'
                    . $number . '. ' . e(basename($file)) . '</div></div>';
            })->implode('');

        return new HtmlString('<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px;max-height:55vh;overflow-y:auto;">' . $cards . '</div>');
    }
}
