<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProjects extends ListRecords
{
    protected static string $resource = ProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('importProjects')
                ->label('Import from CSV')
                ->icon('heroicon-o-arrow-up-tray')
                ->color('gray')
                ->url(ProjectResource::getUrl('import')),
            Actions\CreateAction::make(),
        ];
    }
}
