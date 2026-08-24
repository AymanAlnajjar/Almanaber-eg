<?php

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\StatController;
use App\Http\Controllers\Api\AboutPageController;
use App\Http\Controllers\Api\ValueController;
use App\Http\Controllers\Api\AwardController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Health check for Railway deployment
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

// Public API routes for projects
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/homepage', [ProjectController::class, 'homepage']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Public API routes for news
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/homepage', [NewsController::class, 'homepage']);
Route::get('/news/{id}', [NewsController::class, 'show']);

// Public API routes for blogs
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/homepage', [BlogController::class, 'homepage']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);

// Contact form submission endpoint (public, rate-limited)
Route::middleware('throttle:10,1')
    ->post('/contact', [ContactController::class, 'store']);

// Page view tracking endpoint (rate-limited to prevent spam)
Route::middleware('throttle:60,1')
    ->post('/track', [TrackingController::class, 'track']);

// Public API routes for hero slides
Route::get('/hero-slides', [HeroSlideController::class, 'index']);

// Public API routes for services
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

// Public API routes for team members
Route::get('/team-members', [TeamMemberController::class, 'index']);
Route::get('/team-members/{id}', [TeamMemberController::class, 'show']);

// Public API routes for clients
Route::get('/clients', [ClientController::class, 'index']);
Route::get('/clients/{id}', [ClientController::class, 'show']);

// Public API routes for partners
Route::get('/partners', [PartnerController::class, 'index']);
Route::get('/partners/{id}', [PartnerController::class, 'show']);

// Public API routes for statistics
Route::get('/stats', [StatController::class, 'index']);
Route::get('/stats/{id}', [StatController::class, 'show']);

// Public API routes for about page
Route::get('/about-page', [AboutPageController::class, 'index']);

// Public API routes for company values
Route::get('/values', [ValueController::class, 'index']);
Route::get('/values/{id}', [ValueController::class, 'show']);

// Public API routes for awards
Route::get('/awards', [AwardController::class, 'index']);
Route::get('/awards/{id}', [AwardController::class, 'show']);

// Sitemap data endpoint - returns all published content IDs for sitemap generation
Route::get('/sitemap-data', function () {
    return response()->json([
        'projects' => \App\Models\Project::where('is_published', true)
            ->select('id', 'updated_at')
            ->orderBy('sort_order')
            ->get(),
        'news' => \App\Models\News::where('is_published', true)
            ->select('id', 'publish_date', 'updated_at')
            ->orderBy('publish_date', 'desc')
            ->get(),
        'blogs' => \App\Models\Blog::where('is_published', true)
            ->select('id', 'publish_date', 'updated_at')
            ->orderBy('publish_date', 'desc')
            ->get(),
        'services' => \App\Models\Service::where('is_active', true)
            ->select('id', 'slug_en', 'updated_at')
            ->orderBy('sort_order')
            ->get(),
    ]);
});
