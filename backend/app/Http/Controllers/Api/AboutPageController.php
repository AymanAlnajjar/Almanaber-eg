<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutPageSetting;
use Illuminate\Http\Request;

class AboutPageController extends Controller
{
    /**
     * Get the about page settings
     */
    public function index()
    {
        $settings = AboutPageSetting::first();

        if (!$settings) {
            return response()->json(['message' => 'About page settings not found'], 404);
        }

        return response()->json([
            'hero_title_en' => $settings->hero_title_en,
            'hero_title_ar' => $settings->hero_title_ar,
            'hero_subtitle_en' => $settings->hero_subtitle_en,
            'hero_subtitle_ar' => $settings->hero_subtitle_ar,
            'hero_background_image' => $settings->hero_background_image ? asset('storage/' . $settings->hero_background_image) : null,
            'who_we_are_title_en' => $settings->who_we_are_title_en,
            'who_we_are_title_ar' => $settings->who_we_are_title_ar,
            'who_we_are_content_en' => $settings->who_we_are_content_en,
            'who_we_are_content_ar' => $settings->who_we_are_content_ar,
            'values_section_title_en' => $settings->values_section_title_en,
            'values_section_title_ar' => $settings->values_section_title_ar,
            'leadership_title_en' => $settings->leadership_title_en,
            'leadership_title_ar' => $settings->leadership_title_ar,
            'awards_title_en' => $settings->awards_title_en,
            'awards_title_ar' => $settings->awards_title_ar,
            'portfolio_title_en' => $settings->portfolio_title_en,
            'portfolio_title_ar' => $settings->portfolio_title_ar,
            'portfolio_description_en' => $settings->portfolio_description_en,
            'portfolio_description_ar' => $settings->portfolio_description_ar,
            'portfolio_button_text_en' => $settings->portfolio_button_text_en,
            'portfolio_button_text_ar' => $settings->portfolio_button_text_ar,
            'portfolio_file' => $settings->portfolio_file ? asset('storage/' . $settings->portfolio_file) : null,
        ]);
    }
}