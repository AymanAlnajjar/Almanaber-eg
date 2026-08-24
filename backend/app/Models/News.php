<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'content_en',
        'content_ar',
        'category',
        'author',
        'read_time',
        'publish_date',
        'main_image',
        'gallery_images',
        'is_published',
        'show_on_homepage',
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
        'gallery_images' => 'array',
        'meta_keywords_en' => 'array',
        'meta_keywords_ar' => 'array',
        'is_published' => 'boolean',
        'show_on_homepage' => 'boolean',
        'publish_date' => 'date',
    ];
}
