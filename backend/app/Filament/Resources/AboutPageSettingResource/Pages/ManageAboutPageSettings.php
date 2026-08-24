<?php

namespace App\Filament\Resources\AboutPageSettingResource\Pages;

use App\Filament\Resources\AboutPageSettingResource;
use App\Models\AboutPageSetting;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageAboutPageSettings extends ManageRecords
{
    protected static string $resource = AboutPageSettingResource::class;

    protected function getHeaderActions(): array
    {
        // Only show create button if no settings exist
        $settingsExist = AboutPageSetting::exists();

        if ($settingsExist) {
            return [];
        }

        return [
            Actions\CreateAction::make(),
        ];
    }

    public function mount(): void
    {
        parent::mount();

        // If no settings exist, redirect to create
        if (!AboutPageSetting::exists()) {
            $this->mountAction('create');
        }
    }
}
