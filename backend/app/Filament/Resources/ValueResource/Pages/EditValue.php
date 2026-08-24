<?php

namespace App\Filament\Resources\ValueResource\Pages;

use App\Filament\Resources\ValueResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditValue extends EditRecord
{
    protected static string $resource = ValueResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}