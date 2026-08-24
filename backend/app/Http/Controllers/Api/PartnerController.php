<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    /**
     * Get all active partners ordered by sort_order
     */
    public function index()
    {
        $partners = Partner::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($partner) {
                return [
                    'id' => $partner->id,
                    'name_en' => $partner->name_en,
                    'name_ar' => $partner->name_ar,
                    'description_en' => $partner->description_en,
                    'description_ar' => $partner->description_ar,
                    'logo' => $partner->logo ? asset('storage/' . $partner->logo) : null,
                    'website' => $partner->website,
                    'sort_order' => $partner->sort_order,
                ];
            });

        return response()->json($partners);
    }

    /**
     * Get a single partner by ID
     */
    public function show($id)
    {
        $partner = Partner::find($id);

        if (!$partner) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        return response()->json([
            'id' => $partner->id,
            'name_en' => $partner->name_en,
            'name_ar' => $partner->name_ar,
            'description_en' => $partner->description_en,
            'description_ar' => $partner->description_ar,
            'logo' => $partner->logo ? asset('storage/' . $partner->logo) : null,
            'website' => $partner->website,
            'sort_order' => $partner->sort_order,
        ]);
    }
}
