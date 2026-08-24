<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Project;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Get all active services
     */
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'slug' => $service->slug_en,
                    'title_en' => $service->title_en,
                    'title_ar' => $service->title_ar,
                    'description_en' => $service->description_en,
                    'description_ar' => $service->description_ar,
                    'details_en' => $service->details_en,
                    'details_ar' => $service->details_ar,
                    'icon' => $service->icon ? asset('storage/' . $service->icon) : null,
                    'background_image' => $service->background_image ? asset('storage/' . $service->background_image) : null,
                    'sort_order' => $service->sort_order,
                ];
            });

        return response()->json($services);
    }

    /**
     * Get single service (by slug or numeric id) with its latest projects + SEO.
     */
    public function show(string $id)
    {
        $query = Service::where('is_active', true);

        // Prefer slug lookup; fall back to numeric id for backward compatibility.
        $service = $query->where('slug_en', $id)->first()
            ?? Service::where('is_active', true)->find($id);

        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        // Newest published projects tagged with this service (by slug). Projects
        // can now carry several services, so match membership in the JSON array —
        // with a fallback to the legacy single-value column for any old row.
        $projects = Project::where('is_published', true)
            ->where(function ($q) use ($service) {
                $q->whereJsonContains('services', $service->slug_en)
                    ->orWhere('service', $service->slug_en);
            })
            ->orderBy('sort_order', 'desc')
            ->orderBy('id', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name_en' => $project->name_en,
                    'name_ar' => $project->name_ar,
                    'area_en' => $project->area_en,
                    'area_ar' => $project->area_ar,
                    'types' => !empty($project->types) ? $project->types : ($project->type ? [$project->type] : []),
                    'main_image' => $project->main_image ? asset('storage/' . $project->main_image) : null,
                ];
            });

        return response()->json([
            'id' => $service->id,
            'slug' => $service->slug_en,
            'projects' => $projects,
            'title_en' => $service->title_en,
            'title_ar' => $service->title_ar,
            'description_en' => $service->description_en,
            'description_ar' => $service->description_ar,
            'details_en' => $service->details_en,
            'details_ar' => $service->details_ar,
            'icon' => $service->icon ? asset('storage/' . $service->icon) : null,
            'background_image' => $service->background_image ? asset('storage/' . $service->background_image) : null,
            'seo' => [
                'meta_title_en' => $service->meta_title_en,
                'meta_title_ar' => $service->meta_title_ar,
                'meta_description_en' => $service->meta_description_en,
                'meta_description_ar' => $service->meta_description_ar,
                'meta_keywords_en' => is_array($service->meta_keywords_en)
                    ? implode(', ', $service->meta_keywords_en)
                    : ($service->meta_keywords_en ?? ''),
                'meta_keywords_ar' => is_array($service->meta_keywords_ar)
                    ? implode(', ', $service->meta_keywords_ar)
                    : ($service->meta_keywords_ar ?? ''),
                'slug_en' => $service->slug_en,
                'slug_ar' => $service->slug_ar,
                'og_image' => $service->background_image
                    ? asset('storage/' . $service->background_image)
                    : null,
            ],
        ]);
    }
}
