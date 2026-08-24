<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * Get all active team members ordered by sort_order
     */
    public function index()
    {
        $teamMembers = TeamMember::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name_en' => $member->name_en,
                    'name_ar' => $member->name_ar,
                    'position_en' => $member->position_en,
                    'position_ar' => $member->position_ar,
                    'bio_en' => $member->bio_en,
                    'bio_ar' => $member->bio_ar,
                    'image' => $member->image ? asset('storage/' . $member->image) : null,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'linkedin' => $member->linkedin,
                    'sort_order' => $member->sort_order,
                ];
            });

        return response()->json($teamMembers);
    }

    /**
     * Get a single team member by ID
     */
    public function show($id)
    {
        $member = TeamMember::find($id);

        if (!$member) {
            return response()->json(['message' => 'Team member not found'], 404);
        }

        return response()->json([
            'id' => $member->id,
            'name_en' => $member->name_en,
            'name_ar' => $member->name_ar,
            'position_en' => $member->position_en,
            'position_ar' => $member->position_ar,
            'bio_en' => $member->bio_en,
            'bio_ar' => $member->bio_ar,
            'image' => $member->image ? asset('storage/' . $member->image) : null,
            'email' => $member->email,
            'phone' => $member->phone,
            'linkedin' => $member->linkedin,
            'sort_order' => $member->sort_order,
        ]);
    }
}
