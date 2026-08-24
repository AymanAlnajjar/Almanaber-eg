<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Value;
use Illuminate\Http\Request;

class ValueController extends Controller
{
    /**
     * Get all active values ordered by sort_order
     */
    public function index()
    {
        $values = Value::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($value) {
                return [
                    'id' => $value->id,
                    'title_en' => $value->title_en,
                    'title_ar' => $value->title_ar,
                    'description_en' => $value->description_en,
                    'description_ar' => $value->description_ar,
                    'icon' => $value->icon,
                    'color' => $value->color,
                    'sort_order' => $value->sort_order,
                ];
            });

        return response()->json($values);
    }

    /**
     * Get a single value by ID
     */
    public function show($id)
    {
        $value = Value::find($id);

        if (!$value) {
            return response()->json(['message' => 'Value not found'], 404);
        }

        return response()->json([
            'id' => $value->id,
            'title_en' => $value->title_en,
            'title_ar' => $value->title_ar,
            'description_en' => $value->description_en,
            'description_ar' => $value->description_ar,
            'icon' => $value->icon,
            'color' => $value->color,
            'sort_order' => $value->sort_order,
        ]);
    }
}