<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Models\Blog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;

    protected static ?string $navigationIcon = 'heroicon-o-pencil-square';

    protected static ?string $navigationLabel = 'Blogs';

    protected static ?string $pluralModelLabel = 'Blogs';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Blog Details')
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
                                        'company_news' => 'Company News',
                                        'tips_and_guides' => 'Tips & Guides',
                                        'industry_trends' => 'Industry Trends',
                                        'case_studies' => 'Case Studies',
                                        'announcements' => 'Announcements',
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
                                    ->directory('blogs/main')
                                    ->imageEditor()
                                    ->required(),
                                Forms\Components\FileUpload::make('gallery_images')
                                    ->label('Gallery Images')
                                    ->image()
                                    ->multiple()
                                    ->directory('blogs/gallery')
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
                                    ->helperText('Only 3 blog items will be displayed on homepage')
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
                                    ->description('Leave blank to auto-generate from blog title and description.')
                                    ->collapsible()
                                    ->schema([
                                        Forms\Components\TextInput::make('meta_title_en')
                                            ->label('Meta Title (English)')
                                            ->maxLength(70)
                                            ->helperText('Recommended: 50-60 characters.')
                                            ->placeholder('e.g. Top 10 Construction Trends 2026 | AlMnabr Blog'),
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
                                            ->helperText('URL-friendly name. Leave blank to auto-generate.'),
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
                        'primary' => 'company_news',
                        'success' => 'tips_and_guides',
                        'warning' => 'industry_trends',
                        'info' => 'case_studies',
                        'danger' => 'announcements',
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
                        'company_news' => 'Company News',
                        'tips_and_guides' => 'Tips & Guides',
                        'industry_trends' => 'Industry Trends',
                        'case_studies' => 'Case Studies',
                        'announcements' => 'Announcements',
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
            'index' => Pages\ListBlogs::route('/'),
            'create' => Pages\CreateBlog::route('/create'),
            'edit' => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
