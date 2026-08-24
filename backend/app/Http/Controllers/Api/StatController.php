<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use Illuminate\Http\Request;

class StatController extends Controller
{
    /**
     * Get all active statistics ordered by sort_order
     */
    public function index()
    {
        $stats = Stat::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($stat) {
                return [
                    'id' => $stat->id,
                    'label_en' => $stat->label_en,
                    'label_ar' => $stat->label_ar,
                    'value' => $stat->value,
                    'icon' => $stat->icon,
                    'prefix' => $stat->prefix,
                    'suffix' => $stat->suffix,
                    'sort_order' => $stat->sort_order,
                ];
            });

        return response()->json($stats);
    }

    /**
     * Get a single statistic by ID
     */
    public function show($id)
    {
        $stat = Stat::find($id);

        if (!$stat) {
            return response()->json(['message' => 'Statistic not found'], 404);
        }

        return response()->json([
            'id' => $stat->id,
            'label_en' => $stat->label_en,
            'label_ar' => $stat->label_ar,
            'value' => $stat->value,
            'icon' => $stat->icon,
            'prefix' => $stat->prefix,
            'suffix' => $stat->suffix,
            'sort_order' => $stat->sort_order,
        ]);
    }
}
