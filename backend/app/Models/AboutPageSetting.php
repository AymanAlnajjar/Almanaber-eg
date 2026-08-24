<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title_en',
        'hero_title_ar',
        'hero_subtitle_en',
        'hero_subtitle_ar',
        'hero_background_image',
        'who_we_are_title_en',
        'who_we_are_title_ar',
        'who_we_are_content_en',
        'who_we_are_content_ar',
        'values_section_title_en',
        'values_section_title_ar',
        'leadership_title_en',
        'leadership_title_ar',
        'awards_title_en',
        'awards_title_ar',
        'portfolio_title_en',
        'portfolio_title_ar',
        'portfolio_description_en',
        'portfolio_description_ar',
        'portfolio_button_text_en',
        'portfolio_button_text_ar',
        'portfolio_file',
    ];
}
