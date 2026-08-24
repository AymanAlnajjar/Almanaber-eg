<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Projects';

    protected static ?int $navigationSort = 1;

    /** Project type options — shared by the form field, table column, and filter. */
    public const TYPE_OPTIONS = [
        'housing' => 'Housing',
        'commercial' => 'Commercial',
        'industrial' => 'Industrial',
        'medical' => 'Medical',
        'governmental' => 'Governmental',
        'entertainment' => 'Entertainment',
        'mosques' => 'Mosques',
        'interior_design' => 'Interior Design',
        'support_services' => 'Support Services',
    ];

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Project Details')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('name_en')
                                    ->label('Project Name (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('area_en')
                                    ->label('Area/Region (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('location_en')
                                    ->label('Location (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('project_area_en')
                                    ->label('Project Area (English)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('mission_en')
                                    ->label('Mission/Description (English)')
                                    ->required()
                                    ->rows(4)
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('components_en')
                                    ->label('Components (English)')
                                    ->required()
                                    ->rows(4)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('client_en')
                                    ->label('Client Name (English)')
                                    ->required()
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\TextInput::make('name_ar')
                                    ->label('Project Name (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('area_ar')
                                    ->label('Area/Region (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('location_ar')
                                    ->label('Location (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('project_area_ar')
                                    ->label('Project Area (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('mission_ar')
                                    ->label('Mission/Description (Arabic)')
                                    ->required()
                                    ->rows(4)
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('components_ar')
                                    ->label('Components (Arabic)')
                                    ->required()
                                    ->rows(4)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('client_ar')
                                    ->label('Client Name (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Tabs\Tab::make('Project Details')
                            ->schema([
                                Forms\Components\Select::make('types')
                                    ->label('Project Types')
                                    ->helperText('A project can belong to more than one type — it will appear under each type filter.')
                                    ->multiple()
                                    ->required()
                                    ->options(self::TYPE_OPTIONS),
                                Forms\Components\Select::make('services')
                                    ->label('Services')
                                    ->helperText('Link this project to one or more Services. Each Service page shows projects tagged with it.')
                                    ->multiple()
                                    ->required()
                                    ->searchable()
                                    ->options(fn () => \App\Models\Service::orderBy('sort_order')
                                        ->get()
                                        ->pluck('title_en', 'slug_en')
                                        ->filter(fn ($label, $slug) => !empty($slug))
                                        ->toArray()),
                            ]),
                        Forms\Components\Tabs\Tab::make('Images')
                            ->schema([
                                Forms\Components\FileUpload::make('main_image')
                                    ->label('Main Image')
                                    ->image()
                                    ->directory('projects/main')
                                    ->required()
                                    ->imageEditor()
                                    ->columnSpanFull(),
                                Forms\Components\FileUpload::make('gallery_images')
                                    ->label('Gallery Images')
                                    ->image()
                                    ->multiple()
                                    ->directory('projects/gallery')
                                    ->reorderable()
                                    ->imageEditor()
                                    ->maxFiles(10)
                                    ->columnSpanFull(),
                            ]),
                        Forms\Components\Tabs\Tab::make('Display Settings')
                            ->schema([
                                Forms\Components\Toggle::make('is_published')
                                    ->label('Published')
                                    ->default(true)
                                    ->helperText('Toggle to publish/unpublish this project'),
                                Forms\Components\Toggle::make('show_on_homepage')
                                    ->label('Show on Homepage')
                                    ->default(false)
                                    ->helperText('Only 6 projects with highest sort order will be displayed on homepage'),
                                Forms\Components\TextInput::make('sort_order')
                                    ->label('Sort Order')
                                    ->numeric()
                                    ->default(0)
                                    ->helperText('Higher numbers appear first'),
                            ]),

                        // SEO Tab
                        Forms\Components\Tabs\Tab::make('SEO')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                Forms\Components\Section::make('SEO - English')
                                    ->description('Search engine optimization fields for English content. Leave blank to auto-generate from project name and description.')
                                    ->collapsible()
                                    ->schema([
                                        Forms\Components\TextInput::make('meta_title_en')
                                            ->label('Meta Title (English)')
                                            ->maxLength(70)
                                            ->helperText('Recommended: 50-60 characters. Shows in browser tab and Google results.')
                                            ->placeholder('e.g. Luxury Villa Complex - Riyadh | AlMnaber Projects'),
                                        Forms\Components\Textarea::make('meta_description_en')
                                            ->label('Meta Description (English)')
                                            ->rows(3)
                                            ->maxLength(160)
                                            ->helperText('Recommended: 120-160 characters. Shows below title in Google results.')
                                            ->placeholder('e.g. A premium residential villa complex in Riyadh featuring modern architectural design and sustainable engineering solutions.'),
                                        Forms\Components\TagsInput::make('meta_keywords_en')
                                            ->label('Keywords (English)')
                                            ->helperText('Add relevant keywords separated by Enter. E.g: villa, Riyadh, residential, architecture')
                                            ->placeholder('Type a keyword and press Enter'),
                                        Forms\Components\TextInput::make('slug_en')
                                            ->label('URL Slug (English)')
                                            ->maxLength(255)
                                            ->helperText('URL-friendly name. E.g: luxury-villa-riyadh. Leave blank to auto-generate.')
                                            ->placeholder('luxury-villa-riyadh'),
                                    ]),
                                Forms\Components\Section::make('SEO - Arabic')
                                    ->description('Search engine optimization fields for Arabic content.')
                                    ->collapsible()
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\TextInput::make('meta_title_ar')
                                            ->label('Meta Title (Arabic)')
                                            ->maxLength(70)
                                            ->helperText('Recommended: 50-60 characters.'),
                                        Forms\Components\Textarea::make('meta_description_ar')
                                            ->label('Meta Description (Arabic)')
                                            ->rows(3)
                                            ->maxLength(160)
                                            ->helperText('Recommended: 120-160 characters.'),
                                        Forms\Components\TagsInput::make('meta_keywords_ar')
                                            ->label('Keywords (Arabic)')
                                            ->helperText('Add relevant keywords in Arabic')
                                            ->placeholder('Type a keyword and press Enter'),
                                        Forms\Components\TextInput::make('slug_ar')
                                            ->label('URL Slug (Arabic)')
                                            ->maxLength(255),
                                    ]),
                                Forms\Components\Section::make('Social Media Image')
                                    ->description('Custom image for social media sharing (Facebook, LinkedIn, Twitter). Falls back to main image if empty.')
                                    ->collapsible()
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\FileUpload::make('og_image')
                                            ->label('Open Graph Image')
                                            ->image()
                                            ->directory('seo/og-images')
                                            ->imageEditor()
                                            ->helperText('Recommended size: 1200x630px. Used when sharing on social media.'),
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
                Tables\Columns\ImageColumn::make('main_image')
                    ->label('Image')
                    ->square(),
                Tables\Columns\TextColumn::make('name_en')
                    ->label('Name (EN)')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name_ar')
                    ->label('Name (AR)')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('types')
                    ->label('Types')
                    ->badge()
                    ->formatStateUsing(fn ($state) => self::TYPE_OPTIONS[$state] ?? $state),
                Tables\Columns\TextColumn::make('services')
                    ->label('Services')
                    ->badge()
                    ->toggleable(),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Published')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\IconColumn::make('show_on_homepage')
                    ->label('Homepage')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('types')
                    ->label('Type')
                    ->options(self::TYPE_OPTIONS)
                    ->query(fn (Builder $query, array $data): Builder => filled($data['value'])
                        ? $query->whereJsonContains('types', $data['value'])
                        : $query),
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published'),
                Tables\Filters\TernaryFilter::make('show_on_homepage')
                    ->label('On Homepage'),
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
            ->defaultSort('sort_order', 'desc');
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
            'index'  => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit'   => Pages\EditProject::route('/{record}/edit'),
            'import' => Pages\ImportProjects::route('/import'),
        ];
    }
}
