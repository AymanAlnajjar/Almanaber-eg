<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Get all published projects
     */
    public function index()
    {
        $projects = Project::where('is_published', true)
            ->orderBy('sort_order', 'desc')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name_en' => $project->name_en,
                    'name_ar' => $project->name_ar,
                    'area_en' => $project->area_en,
                    'area_ar' => $project->area_ar,
                    'types' => !empty($project->types) ? $project->types : ($project->type ? [$project->type] : []),
                    'services' => !empty($project->services) ? $project->services : ($project->service ? [$project->service] : []),
                    'main_image' => $project->main_image ? asset('storage/' . $project->main_image) : null,
                    'show_on_homepage' => $project->show_on_homepage,
                ];
            });

        return response()->json($projects);
    }

    /**
     * Get projects for homepage (6 projects with show_on_homepage = true)
     */
    public function homepage()
    {
        $projects = Project::where('is_published', true)
            ->where('show_on_homepage', true)
            ->orderBy('sort_order', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name_en' => $project->name_en,
                    'name_ar' => $project->name_ar,
                    'area_en' => $project->area_en,
                    'area_ar' => $project->area_ar,
                    'types' => !empty($project->types) ? $project->types : ($project->type ? [$project->type] : []),
                    'services' => !empty($project->services) ? $project->services : ($project->service ? [$project->service] : []),
                    'main_image' => $project->main_image ? asset('storage/' . $project->main_image) : null,
                ];
            });

        return response()->json($projects);
    }

    /**
     * Get a single project with all details
     */
    public function show(string $id)
    {
        $project = Project::where('is_published', true)
            ->find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json([
            'id' => $project->id,
            'name_en' => $project->name_en,
            'name_ar' => $project->name_ar,
            'area_en' => $project->area_en,
            'area_ar' => $project->area_ar,
            'location_en' => $project->location_en,
            'location_ar' => $project->location_ar,
            'project_area_en' => $project->project_area_en,
            'project_area_ar' => $project->project_area_ar,
            'mission_en' => $project->mission_en,
            'mission_ar' => $project->mission_ar,
            'components_en' => $project->components_en,
            'components_ar' => $project->components_ar,
            'client_en' => $project->client_en,
            'client_ar' => $project->client_ar,
            'types' => !empty($project->types) ? $project->types : ($project->type ? [$project->type] : []),
            'services' => !empty($project->services) ? $project->services : ($project->service ? [$project->service] : []),
            'main_image' => $project->main_image ? asset('storage/' . $project->main_image) : null,
            'gallery_images' => $project->gallery_images ? array_map(function ($image) {
                return asset('storage/' . $image);
            }, $project->gallery_images) : [],
            // SEO fields
            'seo' => [
                'meta_title_en' => $project->meta_title_en,
                'meta_title_ar' => $project->meta_title_ar,
                'meta_description_en' => $project->meta_description_en,
                'meta_description_ar' => $project->meta_description_ar,
                'meta_keywords_en' => $project->meta_keywords_en,
                'meta_keywords_ar' => $project->meta_keywords_ar,
                'slug_en' => $project->slug_en,
                'slug_ar' => $project->slug_ar,
                'og_image' => $project->og_image ? asset('storage/' . $project->og_image) : null,
            ],
        ]);
    }
}
