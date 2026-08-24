<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;

class HeroSlideController extends Controller
{
    /**
     * Get all active hero slides
     */
    public function index()
    {
        $slides = HeroSlide::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($slide) {
                return [
                    'id' => $slide->id,
                    'title_en' => $slide->title_en,
                    'title_ar' => $slide->title_ar,
                    'area_en' => $slide->area_en,
                    'area_ar' => $slide->area_ar,
                    'image' => $slide->image ? asset('storage/' . $slide->image) : null,
                    'sort_order' => $slide->sort_order,
                ];
            });

        return response()->json($slides);
    }
}
