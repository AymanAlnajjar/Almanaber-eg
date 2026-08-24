<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutPageSettingResource\Pages;
use App\Models\AboutPageSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AboutPageSettingResource extends Resource
{
    protected static ?string $model = AboutPageSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'About Page Settings';

    protected static ?string $navigationGroup = 'Page Settings';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('About Page Content')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Hero Section')
                            ->schema([
                                Forms\Components\Section::make('English Content')
                                    ->schema([
                                        Forms\Components\TextInput::make('hero_title_en')
                                            ->label('Hero Title (English)')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\Textarea::make('hero_subtitle_en')
                                            ->label('Hero Subtitle (English)')
                                            ->required()
                                            ->rows(3),
                                    ]),
                                Forms\Components\Section::make('Arabic Content')
                                    ->schema([
                                        Forms\Components\TextInput::make('hero_title_ar')
                                            ->label('Hero Title (Arabic)')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\Textarea::make('hero_subtitle_ar')
                                            ->label('Hero Subtitle (Arabic)')
                                            ->required()
                                            ->rows(3),
                                    ]),
                                Forms\Components\Section::make('Background Image')
                                    ->schema([
                                        Forms\Components\FileUpload::make('hero_background_image')
                                            ->label('Hero Background Image')
                                            ->image()
                                            ->directory('about/hero')
                                            ->imageEditor()
                                            ->required(),
                                    ]),
                            ]),
                        Forms\Components\Tabs\Tab::make('Who We Are')
                            ->schema([
                                Forms\Components\Section::make('English Content')
                                    ->schema([
                                        Forms\Components\TextInput::make('who_we_are_title_en')
                                            ->label('Section Title (English)')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\RichEditor::make('who_we_are_content_en')
                                            ->label('Content (English)')
                                            ->required(),
                                    ]),
                                Forms\Components\Section::make('Arabic Content')
                                    ->schema([
                                        Forms\Components\TextInput::make('who_we_are_title_ar')
                                            ->label('Section Title (Arabic)')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\RichEditor::make('who_we_are_content_ar')
                                            ->label('Content (Arabic)')
                                            ->required(),
                                    ]),
                            ]),
                        Forms\Components\Tabs\Tab::make('Section Titles')
                            ->schema([
                                Forms\Components\Section::make('Values Section')
                                    ->schema([
                                        Forms\Components\TextInput::make('values_section_title_en')
                                            ->label('Values Section Title (English)')
                                            ->required(),
                                        Forms\Components\TextInput::make('values_section_title_ar')
                                            ->label('Values Section Title (Arabic)')
                                            ->required(),
                                    ]),
                                Forms\Components\Section::make('Leadership Section')
                                    ->schema([
                                        Forms\Components\TextInput::make('leadership_title_en')
                                            ->label('Leadership Title (English)')
                                            ->required(),
                                        Forms\Components\TextInput::make('leadership_title_ar')
                                            ->label('Leadership Title (Arabic)')
                                            ->required(),
                                    ]),
                                Forms\Components\Section::make('Awards Section')
                                    ->schema([
                                        Forms\Components\TextInput::make('awards_title_en')
                                            ->label('Awards Title (English)')
                                            ->required(),
                                        Forms\Components\TextInput::make('awards_title_ar')
                                            ->label('Awards Title (Arabic)')
                                            ->required(),
                                    ]),
                            ]),
                        Forms\Components\Tabs\Tab::make('Portfolio Download')
                            ->schema([
                                Forms\Components\Section::make('English Content')
                                    ->schema([
                                        Forms\Components\TextInput::make('portfolio_title_en')
                                            ->label('Title (English)')
                                            ->required(),
                                        Forms\Components\Textarea::make('portfolio_description_en')
                                            ->label('Description (English)')
                                            ->required()
                                            ->rows(3),
                                        Forms\Components\TextInput::make('portfolio_button_text_en')
                                            ->label('Button Text (English)')
                                            ->required(),
                                    ]),
                                Forms\Components\Section::make('Arabic Content')
                                    ->schema([
                                        Forms\Components\TextInput::make('portfolio_title_ar')
                                            ->label('Title (Arabic)')
                                            ->required(),
                                        Forms\Components\Textarea::make('portfolio_description_ar')
                                            ->label('Description (Arabic)')
                                            ->required()
                                            ->rows(3),
                                        Forms\Components\TextInput::make('portfolio_button_text_ar')
                                            ->label('Button Text (Arabic)')
                                            ->required(),
                                    ]),
                                Forms\Components\Section::make('Portfolio File')
                                    ->schema([
                                        Forms\Components\FileUpload::make('portfolio_file')
                                            ->label('Portfolio PDF File')
                                            ->acceptedFileTypes(['application/pdf'])
                                            ->directory('about/portfolio')
                                            ->helperText('Upload your company portfolio PDF'),
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
                Tables\Columns\TextColumn::make('hero_title_en')
                    ->label('Hero Title (EN)')
                    ->limit(50),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageAboutPageSettings::route('/'),
        ];
    }
}
