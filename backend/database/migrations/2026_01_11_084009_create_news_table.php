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
        Schema::create('news', function (Blueprint $table) {
            $table->id();

            // Multilingual fields - English
            $table->string('title_en');
            $table->text('description_en');
            $table->longText('content_en');

            // Multilingual fields - Arabic
            $table->string('title_ar');
            $table->text('description_ar');
            $table->longText('content_ar');

            // Category
            $table->string('category'); // project_completion, project_development, project_milestone, company_achievement, industry_insights

            // Author and metadata
            $table->string('author')->default('AlMnabr Team');
            $table->integer('read_time')->default(3); // in minutes
            $table->date('publish_date');

            // Images
            $table->string('main_image')->nullable();
            $table->json('gallery_images')->nullable();

            // Display settings
            $table->boolean('is_published')->default(true);
            $table->boolean('show_on_homepage')->default(false);
            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
