<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Get all published news
     */
    public function index(Request $request)
    {
        $query = News::where('is_published', true);

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $news = $query->orderBy('publish_date', 'desc')
            ->orderBy('sort_order', 'desc')
            ->get()
            ->map(function ($newsItem) {
                return [
                    'id' => $newsItem->id,
                    'title_en' => $newsItem->title_en,
                    'title_ar' => $newsItem->title_ar,
                    'description_en' => $newsItem->description_en,
                    'description_ar' => $newsItem->description_ar,
                    'category' => $newsItem->category,
                    'author' => $newsItem->author,
                    'read_time' => $newsItem->read_time,
                    'publish_date' => $newsItem->publish_date->format('Y-m-d'),
                    'main_image' => $newsItem->main_image ? asset('storage/' . $newsItem->main_image) : null,
                ];
            });

        return response()->json($news);
    }

    /**
     * Get news for homepage (3 latest)
     */
    public function homepage()
    {
        $news = News::where('is_published', true)
            ->where('show_on_homepage', true)
            ->orderBy('sort_order', 'desc')
            ->orderBy('publish_date', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($newsItem) {
                return [
                    'id' => $newsItem->id,
                    'title_en' => $newsItem->title_en,
                    'title_ar' => $newsItem->title_ar,
                    'description_en' => $newsItem->description_en,
                    'description_ar' => $newsItem->description_ar,
                    'category' => $newsItem->category,
                    'author' => $newsItem->author,
                    'read_time' => $newsItem->read_time,
                    'publish_date' => $newsItem->publish_date->format('Y-m-d'),
                    'main_image' => $newsItem->main_image ? asset('storage/' . $newsItem->main_image) : null,
                ];
            });

        return response()->json($news);
    }

    /**
     * Get single news item with full details
     */
    public function show(string $id)
    {
        $newsItem = News::where('is_published', true)->find($id);

        if (!$newsItem) {
            return response()->json(['error' => 'News not found'], 404);
        }

        return response()->json([
            'id' => $newsItem->id,
            'title_en' => $newsItem->title_en,
            'title_ar' => $newsItem->title_ar,
            'description_en' => $newsItem->description_en,
            'description_ar' => $newsItem->description_ar,
            'content_en' => $newsItem->content_en,
            'content_ar' => $newsItem->content_ar,
            'category' => $newsItem->category,
            'author' => $newsItem->author,
            'read_time' => $newsItem->read_time,
            'publish_date' => $newsItem->publish_date->format('Y-m-d'),
            'main_image' => $newsItem->main_image ? asset('storage/' . $newsItem->main_image) : null,
            'gallery_images' => $newsItem->gallery_images
                ? array_map(fn($img) => asset('storage/' . $img), $newsItem->gallery_images)
                : [],
            // SEO fields
            'seo' => [
                'meta_title_en' => $newsItem->meta_title_en,
                'meta_title_ar' => $newsItem->meta_title_ar,
                'meta_description_en' => $newsItem->meta_description_en,
                'meta_description_ar' => $newsItem->meta_description_ar,
                'meta_keywords_en' => $newsItem->meta_keywords_en,
                'meta_keywords_ar' => $newsItem->meta_keywords_ar,
                'slug_en' => $newsItem->slug_en,
                'slug_ar' => $newsItem->slug_ar,
                'og_image' => $newsItem->og_image ? asset('storage/' . $newsItem->og_image) : null,
            ],
        ]);
    }
}
