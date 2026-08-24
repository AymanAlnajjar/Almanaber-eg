<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Filament\Resources\ServiceResource\RelationManagers;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationLabel = 'Services';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Service Details')
                    ->tabs([
                        // English Tab
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('title_en')
                                    ->label('Title (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_en')
                                    ->label('Description (English)')
                                    ->required()
                                    ->rows(3)
                                    ->maxLength(500)
                                    ->helperText('Short description for cards'),
                                Forms\Components\RichEditor::make('details_en')
                                    ->label('Details (English)')
                                    ->required()
                                    ->columnSpanFull()
                                    ->helperText('Full details displayed on service page'),
                            ]),

                        // Arabic Tab
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\TextInput::make('title_ar')
                                    ->label('Title (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description_ar')
                                    ->label('Description (Arabic)')
                                    ->required()
                                    ->rows(3)
                                    ->maxLength(500)
                                    ->helperText('Short description for cards'),
                                Forms\Components\RichEditor::make('details_ar')
                                    ->label('Details (Arabic)')
                                    ->required()
                                    ->columnSpanFull()
                                    ->helperText('Full details displayed on service page'),
                            ]),

                        // Images & Settings Tab
                        Forms\Components\Tabs\Tab::make('Images & Settings')
                            ->schema([
                                Forms\Components\FileUpload::make('icon')
                                    ->label('Service Icon')
                                    ->image()
                                    ->directory('services/icons')
                                    ->imageEditor()
                                    ->helperText('Icon displayed on service cards'),
                                Forms\Components\FileUpload::make('background_image')
                                    ->label('Background Image')
                                    ->image()
                                    ->directory('services/backgrounds')
                                    ->imageEditor()
                                    ->helperText('Background image for service card'),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true)
                                    ->required()
                                    ->helperText('Only active services will be displayed'),
                                Forms\Components\TextInput::make('sort_order')
                                    ->label('Sort Order')
                                    ->numeric()
                                    ->default(0)
                                    ->helperText('Lower numbers appear first'),
                            ]),

                        // SEO Tab
                        Forms\Components\Tabs\Tab::make('SEO')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                Forms\Components\Section::make('SEO - English')
                                    ->description('Leave blank to auto-generate from service title and description.')
                                    ->collapsible()
                                    ->schema([
                                        Forms\Components\TextInput::make('meta_title_en')
                                            ->label('Meta Title (English)')
                                            ->maxLength(70)
                                            ->helperText('Recommended: 50-60 characters.')
                                            ->placeholder('e.g. Architectural Design Services | AlMnaber'),
                                        Forms\Components\Textarea::make('meta_description_en')
                                            ->label('Meta Description (English)')
                                            ->rows(3)
                                            ->maxLength(160)
                                            ->helperText('Recommended: 120-160 characters.'),
                                        Forms\Components\TagsInput::make('meta_keywords_en')
                                            ->label('Keywords (English)')
                                            ->placeholder('Type a keyword and press Enter'),
                                        Forms\Components\TextInput::make('slug_en')
                                            ->label('URL Slug (English)')
                                            ->maxLength(255)
                                            ->placeholder('architectural-design'),
                                    ]),
                                Forms\Components\Section::make('SEO - Arabic')
                                    ->collapsible()
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\TextInput::make('meta_title_ar')
                                            ->label('Meta Title (Arabic)')
                                            ->maxLength(70),
                                        Forms\Components\Textarea::make('meta_description_ar')
                                            ->label('Meta Description (Arabic)')
                                            ->rows(3)
                                            ->maxLength(160),
                                        Forms\Components\TagsInput::make('meta_keywords_ar')
                                            ->label('Keywords (Arabic)')
                                            ->placeholder('Type a keyword and press Enter'),
                                        Forms\Components\TextInput::make('slug_ar')
                                            ->label('URL Slug (Arabic)')
                                            ->maxLength(255),
                                    ]),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('icon')
                    ->label('Icon')
                    ->square(),
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title (EN)')
                    ->searchable()
                    ->sortable()
                    ->limit(40),
                Tables\Columns\TextColumn::make('description_en')
                    ->label('Description')
                    ->limit(60)
                    ->wrap(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active'),
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
            ->defaultSort('sort_order', 'asc')
            ->reorderable('sort_order');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
