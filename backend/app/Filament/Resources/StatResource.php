<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StatResource\Pages;
use App\Models\Stat;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StatResource extends Resource
{
    protected static ?string $model = Stat::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationLabel = 'Statistics';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Statistic Details')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('label_en')
                                    ->label('Label (English)')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Completed Projects'),
                            ]),
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\TextInput::make('label_ar')
                                    ->label('Label (Arabic)')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., المشاريع المنجزة'),
                            ]),
                        Forms\Components\Tabs\Tab::make('Value & Display')
                            ->schema([
                                Forms\Components\TextInput::make('value')
                                    ->label('Value')
                                    ->numeric()
                                    ->required()
                                    ->default(0)
                                    ->helperText('The number to display (e.g., 2191 for projects)'),
                                Forms\Components\TextInput::make('prefix')
                                    ->label('Prefix')
                                    ->maxLength(10)
                                    ->default('+')
                                    ->helperText('Text before the number (e.g., +, ~, >)'),
                                Forms\Components\TextInput::make('suffix')
                                    ->label('Suffix')
                                    ->maxLength(10)
                                    ->helperText('Text after the number (e.g., K, M, +)'),
                                Forms\Components\TextInput::make('icon')
                                    ->label('Icon Name (Optional)')
                                    ->maxLength(255)
                                    ->helperText('Heroicon name for future use (e.g., building-office)'),
                            ]),
                        Forms\Components\Tabs\Tab::make('Settings')
                            ->schema([
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true)
                                    ->helperText('Only active statistics will be displayed on the website'),
                                Forms\Components\TextInput::make('sort_order')
                                    ->label('Sort Order')
                                    ->numeric()
                                    ->default(0)
                                    ->helperText('Lower numbers appear first (left to right)'),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('label_en')
                    ->label('Label (EN)')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('label_ar')
                    ->label('Label (AR)')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('display_value')
                    ->label('Display')
                    ->getStateUsing(fn ($record) => ($record->prefix ?? '') . number_format($record->value) . ($record->suffix ?? ''))
                    ->sortable(query: fn ($query, $direction) => $query->orderBy('value', $direction)),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active Status')
                    ->placeholder('All statistics')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->reorderable('sort_order');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStats::route('/'),
            'create' => Pages\CreateStat::route('/create'),
            'edit' => Pages\EditStat::route('/{record}/edit'),
        ];
    }
}
