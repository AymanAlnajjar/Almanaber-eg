<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Get all active clients ordered by sort_order
     */
    public function index()
    {
        $clients = Client::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'name_en' => $client->name_en,
                    'name_ar' => $client->name_ar,
                    'description_en' => $client->description_en,
                    'description_ar' => $client->description_ar,
                    'logo' => $client->logo ? asset('storage/' . $client->logo) : null,
                    'website' => $client->website,
                    'sort_order' => $client->sort_order,
                ];
            });

        return response()->json($clients);
    }

    /**
     * Get a single client by ID
     */
    public function show($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        return response()->json([
            'id' => $client->id,
            'name_en' => $client->name_en,
            'name_ar' => $client->name_ar,
            'description_en' => $client->description_en,
            'description_ar' => $client->description_ar,
            'logo' => $client->logo ? asset('storage/' . $client->logo) : null,
            'website' => $client->website,
            'sort_order' => $client->sort_order,
        ]);
    }
}
