<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use Filament\Actions;
use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

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
                ->form([
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
}
