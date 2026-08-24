<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Filament\Resources\NewsResource\RelationManagers;
use App\Models\News;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationLabel = 'News';

    protected static ?string $pluralModelLabel = 'News';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('News Details')
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
                                    ->maxLength(500),
                                Forms\Components\RichEditor::make('content_en')
                                    ->label('Content (English)')
                                    ->required()
                                    ->columnSpanFull(),
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
                                    ->maxLength(500),
                                Forms\Components\RichEditor::make('content_ar')
                                    ->label('Content (Arabic)')
                                    ->required()
                                    ->columnSpanFull(),
                            ]),

                        // Details Tab
                        Forms\Components\Tabs\Tab::make('Details')
                            ->schema([
                                Forms\Components\Select::make('category')
                                    ->label('Category')
                                    ->required()
                                    ->options([
                                        'project_completion' => 'Project Completion',
                                        'project_development' => 'Project Development',
                                        'project_milestone' => 'Project Milestone',
                                        'company_achievement' => 'Company Achievement',
                                        'industry_insights' => 'Industry Insights',
                                    ]),
                                Forms\Components\TextInput::make('author')
                                    ->label('Author')
                                    ->default('AlMnabr Team')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('read_time')
                                    ->label('Read Time (minutes)')
                                    ->numeric()
                                    ->default(3)
                                    ->required()
                                    ->minValue(1)
                                    ->maxValue(60),
                                Forms\Components\DatePicker::make('publish_date')
                                    ->label('Publish Date')
                                    ->required()
                                    ->default(now()),
                            ]),

                        // Images Tab
                        Forms\Components\Tabs\Tab::make('Images')
                            ->schema([
                                Forms\Components\FileUpload::make('main_image')
                                    ->label('Main Image')
                                    ->image()
                                    ->directory('news/main')
                                    ->imageEditor()
                                    ->required(),
                                Forms\Components\FileUpload::make('gallery_images')
                                    ->label('Gallery Images')
                                    ->image()
                                    ->multiple()
                                    ->directory('news/gallery')
                                    ->reorderable()
                                    ->maxFiles(10),
                            ]),

                        // Display Settings Tab
                        Forms\Components\Tabs\Tab::make('Display Settings')
                            ->schema([
                                Forms\Components\Toggle::make('is_published')
                                    ->label('Published')
                                    ->default(true)
                                    ->required(),
                                Forms\Components\Toggle::make('show_on_homepage')
                                    ->label('Show on Homepage')
                                    ->helperText('Only 3 news items will be displayed on homepage')
                                    ->default(false),
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
                                    ->description('Leave blank to auto-generate from article title and description.')
                                    ->collapsible()
                                    ->schema([
                                        Forms\Components\TextInput::make('meta_title_en')
                                            ->label('Meta Title (English)')
                                            ->maxLength(70)
                                            ->helperText('Recommended: 50-60 characters. Shows in browser tab and Google results.')
                                            ->placeholder('e.g. New Riyadh Tower Reaches Milestone | AlMnaber News'),
                                        Forms\Components\Textarea::make('meta_description_en')
                                            ->label('Meta Description (English)')
                                            ->rows(3)
                                            ->maxLength(160)
                                            ->helperText('Recommended: 120-160 characters. Shows below title in Google results.')
                                            ->placeholder('e.g. AlMnaber announces the completion of the structural phase for the new Riyadh Tower commercial complex.'),
                                        Forms\Components\TagsInput::make('meta_keywords_en')
                                            ->label('Keywords (English)')
                                            ->helperText('Add relevant keywords. E.g: construction, milestone, Riyadh, tower')
                                            ->placeholder('Type a keyword and press Enter'),
                                        Forms\Components\TextInput::make('slug_en')
                                            ->label('URL Slug (English)')
                                            ->maxLength(255)
                                            ->helperText('URL-friendly name. Leave blank to auto-generate.')
                                            ->placeholder('riyadh-tower-milestone'),
                                    ]),
                                Forms\Components\Section::make('SEO - Arabic')
                                    ->description('Search engine optimization fields for Arabic content.')
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
                                Forms\Components\Section::make('Social Media Image')
                                    ->description('Custom image for social media sharing. Falls back to main image if empty.')
                                    ->collapsible()
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\FileUpload::make('og_image')
                                            ->label('Open Graph Image')
                                            ->image()
                                            ->directory('seo/og-images')
                                            ->imageEditor()
                                            ->helperText('Recommended size: 1200x630px.'),
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
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title (EN)')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->colors([
                        'primary' => 'project_completion',
                        'success' => 'project_development',
                        'warning' => 'project_milestone',
                        'danger' => 'company_achievement',
                        'info' => 'industry_insights',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('publish_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\IconColumn::make('show_on_homepage')
                    ->label('Homepage')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'project_completion' => 'Project Completion',
                        'project_development' => 'Project Development',
                        'project_milestone' => 'Project Milestone',
                        'company_achievement' => 'Company Achievement',
                        'industry_insights' => 'Industry Insights',
                    ]),
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published'),
                Tables\Filters\TernaryFilter::make('show_on_homepage')
                    ->label('Show on Homepage'),
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
            ->defaultSort('publish_date', 'desc');
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
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
