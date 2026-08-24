<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Models\ContactSubmission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;

    protected static ?string $navigationIcon = 'heroicon-o-inbox';

    protected static ?string $navigationLabel = 'Contact Submissions';

    protected static ?string $pluralModelLabel = 'Contact Submissions';

    protected static ?string $modelLabel = 'Submission';

    protected static ?string $navigationGroup = 'Leads';

    /**
     * Show the unread count as a badge next to the nav item.
     */
    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('is_read', false)
            ->where('is_archived', false)
            ->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        // Submissions are created from the public site, not from the admin.
        // The form is used for the "view / edit status" action only.
        return $form
            ->schema([
                Forms\Components\Section::make('Contact Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->disabled(),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->disabled(),
                        Forms\Components\TextInput::make('phone')
                            ->disabled(),
                        Forms\Components\TextInput::make('subject')
                            ->disabled(),
                        Forms\Components\Textarea::make('message')
                            ->rows(6)
                            ->disabled()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TextInput::make('source')
                            ->disabled(),
                        Forms\Components\TextInput::make('locale')
                            ->disabled(),
                        Forms\Components\TextInput::make('ip_address')
                            ->disabled(),
                        Forms\Components\Textarea::make('user_agent')
                            ->disabled()
                            ->rows(2)
                            ->columnSpanFull(),
                    ])
                    ->columns(3)
                    ->collapsible()
                    ->collapsed(),

                Forms\Components\Section::make('Status')
                    ->schema([
                        Forms\Components\Toggle::make('is_read')
                            ->label('Read'),
                        Forms\Components\Toggle::make('is_archived')
                            ->label('Archived'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\IconColumn::make('is_read')
                    ->label('')
                    ->boolean()
                    ->trueIcon('heroicon-o-envelope-open')
                    ->falseIcon('heroicon-s-envelope')
                    ->trueColor('gray')
                    ->falseColor('warning'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('phone')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('subject')
                    ->limit(40)
                    ->toggleable(),
                Tables\Columns\TextColumn::make('source')
                    ->badge()
                    ->color(fn (string $state): string => match (true) {
                        str_starts_with($state, 'service:')  => 'success',
                        str_starts_with($state, 'project:')  => 'info',
                        $state === 'contact-page'            => 'primary',
                        default                              => 'gray',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_archived')
                    ->label('Archived')
                    ->boolean()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_read')
                    ->label('Read status')
                    ->placeholder('All')
                    ->trueLabel('Read')
                    ->falseLabel('Unread'),
                Tables\Filters\TernaryFilter::make('is_archived')
                    ->label('Archived')
                    ->placeholder('All (not archived)')
                    ->trueLabel('Archived only')
                    ->falseLabel('Not archived')
                    ->default(false),
                Tables\Filters\SelectFilter::make('source')
                    ->options(fn () => ContactSubmission::query()
                        ->select('source')
                        ->distinct()
                        ->pluck('source', 'source')
                        ->toArray()),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->after(fn (ContactSubmission $record) => $record->update(['is_read' => true])),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('mark_read')
                    ->label('Mark read')
                    ->icon('heroicon-o-envelope-open')
                    ->visible(fn (ContactSubmission $record) => !$record->is_read)
                    ->action(fn (ContactSubmission $record) => $record->update(['is_read' => true])),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('mark_read')
                        ->label('Mark as read')
                        ->icon('heroicon-o-envelope-open')
                        ->action(fn ($records) => $records->each->update(['is_read' => true])),
                    Tables\Actions\BulkAction::make('mark_archived')
                        ->label('Archive')
                        ->icon('heroicon-o-archive-box')
                        ->action(fn ($records) => $records->each->update(['is_archived' => true])),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactSubmissions::route('/'),
            'view'  => Pages\ViewContactSubmission::route('/{record}'),
            'edit'  => Pages\EditContactSubmission::route('/{record}/edit'),
        ];
    }

    /**
     * Remove the "Create" button — submissions come from the public site only.
     */
    public static function canCreate(): bool
    {
        return false;
    }
}
