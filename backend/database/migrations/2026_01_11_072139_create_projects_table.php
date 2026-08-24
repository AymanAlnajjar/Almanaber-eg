<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // Multilingual fields - English
            $table->string('name_en');
            $table->string('area_en');
            $table->string('location_en');
            $table->string('project_area_en');
            $table->text('mission_en');
            $table->text('components_en');
            $table->string('client_en');

            // Multilingual fields - Arabic
            $table->string('name_ar');
            $table->string('area_ar');
            $table->string('location_ar');
            $table->string('project_area_ar');
            $table->text('mission_ar');
            $table->text('components_ar');
            $table->string('client_ar');

            // Dropdowns
            $table->string('type'); // housing, commercial, industrial, etc.
            $table->string('service'); // architectural_design, etc.

            // Images (stored as JSON array)
            $table->string('main_image')->nullable();
            $table->json('gallery_images')->nullable();

            // Display settings
            $table->boolean('show_on_homepage')->default(false);
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
