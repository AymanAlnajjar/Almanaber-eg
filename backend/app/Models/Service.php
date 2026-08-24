<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    /**
     * Auto-generate a unique English slug from the title when none is set.
     * The slug is the SEO URL (/services/{slug}) and the value projects use
     * to link to this service.
     */
    protected static function booted(): void
    {
        static::saving(function (Service $service) {
            if (empty($service->slug_en) && !empty($service->title_en)) {
                $base = Str::slug($service->title_en) ?: 'service';
                $slug = $base;
                $i = 1;
                while (static::where('slug_en', $slug)
                    ->where('id', '!=', $service->id)
                    ->exists()) {
                    $slug = $base . '-' . (++$i);
                }
                $service->slug_en = $slug;
            }
        });
    }

    protected $fillable = [
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'details_en',
        'details_ar',
        'icon',
        'background_image',
        'is_active',
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
    ];

    protected $casts = [
        'meta_keywords_en' => 'array',
        'meta_keywords_ar' => 'array',
        'is_active' => 'boolean',
    ];
}
