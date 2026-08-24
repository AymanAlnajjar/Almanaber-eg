<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Award;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    /**
     * Get all active awards ordered by sort_order
     */
    public function index()
    {
        $awards = Award::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($award) {
                return [
                    'id' => $award->id,
                    'title_en' => $award->title_en,
                    'title_ar' => $award->title_ar,
                    'description_en' => $award->description_en,
                    'description_ar' => $award->description_ar,
                    'icon' => $award->icon,
                    'icon_color' => $award->icon_color,
                    'sort_order' => $award->sort_order,
                ];
            });

        return response()->json($awards);
    }

    /**
     * Get a single award by ID
     */
    public function show($id)
    {
        $award = Award::find($id);

        if (!$award) {
            return response()->json(['message' => 'Award not found'], 404);
        }

        return response()->json([
            'id' => $award->id,
            'title_en' => $award->title_en,
            'title_ar' => $award->title_ar,
            'description_en' => $award->description_en,
            'description_ar' => $award->description_ar,
            'icon' => $award->icon,
            'icon_color' => $award->icon_color,
            'sort_order' => $award->sort_order,
        ]);
    }
}