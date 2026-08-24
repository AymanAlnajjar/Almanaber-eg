<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ValueResource\Pages;
use App\Models\Value;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ValueResource extends Resource
{
    protected static ?string $model = Value::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    protected static ?string $navigationLabel = 'Company Values';

    protected static ?string $navigationGroup = 'Page Settings';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Value Details')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('title_en')
                                    ->label('Title (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_en')
                                    ->label('Description (English)')
                                    ->required()
                                    ->rows(4),
                            ]),
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\TextInput::make('title_ar')
                                    ->label('Title (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_ar')
                                    ->label('Description (Arabic)')
                                    ->required()
                                    ->rows(4),
                            ]),
                        Forms\Components\Tabs\Tab::make('Styling & Settings')
                            ->schema([
                                Forms\Components\Select::make('color')
                                    ->label('Gradient Color')
                                    ->options([
                                        'from-blue-800 to-blue-600' => 'Blue (Dark to Light)',
                                        'from-blue-900 to-blue-700' => 'Blue (Darker)',
                                        'from-blue-700 to-blue-500' => 'Blue (Light)',
                                        'from-blue-900 to-blue-800' => 'Blue (Very Dark)',
                                        'from-purple-800 to-purple-600' => 'Purple',
                                        'from-green-800 to-green-600' => 'Green',
                                        'from-red-800 to-red-600' => 'Red',
                                        'from-yellow-800 to-yellow-600' => 'Yellow',
                                    ])
                                    ->default('from-blue-800 to-blue-600')
                                    ->required()
                                    ->helperText('Choose a gradient color for this value'),
                                Forms\Components\TextInput::make('icon')
                                    ->label('Icon Name (Optional)')
                                    ->maxLength(255)
                                    ->helperText('Heroicon name for future use (e.g., star, hand, lightbulb)'),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true)
                                    ->helperText('Only active values will be displayed on the website'),
                                Forms\Components\TextInput::make('sort_order')
                                    ->label('Sort Order')
                                    ->numeric()
                                    ->default(0)
                                    ->helperText('Lower numbers appear first'),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title (EN)')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('title_ar')
                    ->label('Title (AR)')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('color')
                    ->label('Color')
                    ->badge(),
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
                    ->placeholder('All values')
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
            'index' => Pages\ListValues::route('/'),
            'create' => Pages\CreateValue::route('/create'),
            'edit' => Pages\EditValue::route('/{record}/edit'),
        ];
    }
}