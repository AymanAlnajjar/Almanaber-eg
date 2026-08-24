<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Get all published blogs
     */
    public function index(Request $request)
    {
        $query = Blog::where('is_published', true);

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $blogs = $query->orderBy('publish_date', 'desc')
            ->orderBy('sort_order', 'desc')
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title_en' => $blog->title_en,
                    'title_ar' => $blog->title_ar,
                    'description_en' => $blog->description_en,
                    'description_ar' => $blog->description_ar,
                    'category' => $blog->category,
                    'author' => $blog->author,
                    'read_time' => $blog->read_time,
                    'publish_date' => $blog->publish_date->format('Y-m-d'),
                    'main_image' => $blog->main_image ? asset('storage/' . $blog->main_image) : null,
                ];
            });

        return response()->json($blogs);
    }

    /**
     * Get blogs for homepage (3 latest)
     */
    public function homepage()
    {
        $blogs = Blog::where('is_published', true)
            ->where('show_on_homepage', true)
            ->orderBy('sort_order', 'desc')
            ->orderBy('publish_date', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title_en' => $blog->title_en,
                    'title_ar' => $blog->title_ar,
                    'description_en' => $blog->description_en,
                    'description_ar' => $blog->description_ar,
                    'category' => $blog->category,
                    'author' => $blog->author,
                    'read_time' => $blog->read_time,
                    'publish_date' => $blog->publish_date->format('Y-m-d'),
                    'main_image' => $blog->main_image ? asset('storage/' . $blog->main_image) : null,
                ];
            });

        return response()->json($blogs);
    }

    /**
     * Get single blog item with full details
     */
    public function show(string $id)
    {
        $blog = Blog::where('is_published', true)->find($id);

        if (!$blog) {
            return response()->json(['error' => 'Blog not found'], 404);
        }

        return response()->json([
            'id' => $blog->id,
            'title_en' => $blog->title_en,
            'title_ar' => $blog->title_ar,
            'description_en' => $blog->description_en,
            'description_ar' => $blog->description_ar,
            'content_en' => $blog->content_en,
            'content_ar' => $blog->content_ar,
            'category' => $blog->category,
            'author' => $blog->author,
            'read_time' => $blog->read_time,
            'publish_date' => $blog->publish_date->format('Y-m-d'),
            'main_image' => $blog->main_image ? asset('storage/' . $blog->main_image) : null,
            'gallery_images' => $blog->gallery_images
                ? array_map(fn($img) => asset('storage/' . $img), $blog->gallery_images)
                : [],
            // SEO fields
            'seo' => [
                'meta_title_en' => $blog->meta_title_en,
                'meta_title_ar' => $blog->meta_title_ar,
                'meta_description_en' => $blog->meta_description_en,
                'meta_description_ar' => $blog->meta_description_ar,
                'meta_keywords_en' => $blog->meta_keywords_en,
                'meta_keywords_ar' => $blog->meta_keywords_ar,
                'slug_en' => $blog->slug_en,
                'slug_ar' => $blog->slug_ar,
                'og_image' => $blog->og_image ? asset('storage/' . $blog->og_image) : null,
            ],
        ]);
    }
}
