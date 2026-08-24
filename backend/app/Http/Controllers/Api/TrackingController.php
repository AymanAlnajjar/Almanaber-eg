<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function track(Request $request): JsonResponse
    {
        $request->validate([
            'path'    => 'required|string|max:500',
            'locale'  => 'nullable|string|max:10',
            'referrer' => 'nullable|string|max:500',
        ]);

        // Skip tracking for bots
        $ua = $request->userAgent() ?? '';
        $botPatterns = ['bot', 'crawler', 'spider', 'slurp', 'curl', 'wget', 'python', 'axios'];
        foreach ($botPatterns as $pattern) {
            if (stripos($ua, $pattern) !== false) {
                return response()->json(['ok' => true]);
            }
        }

        PageView::create([
            'path'       => $request->input('path'),
            'locale'     => $request->input('locale', 'en'),
            'ip_address' => $request->ip(),
            'user_agent' => substr($ua, 0, 500),
            'referrer'   => $request->input('referrer'),
        ]);

        return response()->json(['ok' => true]);
    }
}
