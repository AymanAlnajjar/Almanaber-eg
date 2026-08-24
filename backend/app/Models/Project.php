<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name_en',
        'name_ar',
        'area_en',
        'area_ar',
        'location_en',
        'location_ar',
        'project_area_en',
        'project_area_ar',
        'mission_en',
        'mission_ar',
        'components_en',
        'components_ar',
        'client_en',
        'client_ar',
        'type',
        'service',
        'types',
        'services',
        'main_image',
        'gallery_images',
        'show_on_homepage',
        'is_published',
        'sort_order',
        // SEO fields
        'meta_title_en',
        'meta_title_ar',
        'meta_description_en',
        'meta_description_ar',
        'meta_keywords_en',
        'meta_keywords_ar',
        'slug_en',
        'slug_ar',
        'og_image',
    ];

    protected $casts = [
        'types' => 'array',
        'services' => 'array',
        'gallery_images' => 'array',
        'meta_keywords_en' => 'array',
        'meta_keywords_ar' => 'array',
        'show_on_homepage' => 'boolean',
        'is_published' => 'boolean',
    ];
}
