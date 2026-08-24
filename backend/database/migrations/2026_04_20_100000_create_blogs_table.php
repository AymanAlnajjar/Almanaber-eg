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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();

            // Multilingual fields - English
            $table->string('title_en');
            $table->text('description_en');
            $table->longText('content_en');

            // Multilingual fields - Arabic
            $table->string('title_ar');
            $table->text('description_ar');
            $table->longText('content_ar');

            // Category (blog topics)
            $table->string('category'); // company_news, tips_and_guides, industry_trends, case_studies, announcements

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

            // SEO fields
            $table->string('meta_title_en')->nullable();
            $table->string('meta_title_ar')->nullable();
            $table->text('meta_description_en')->nullable();
            $table->text('meta_description_ar')->nullable();
            $table->json('meta_keywords_en')->nullable();
            $table->json('meta_keywords_ar')->nullable();
            $table->string('slug_en')->nullable()->unique();
            $table->string('slug_ar')->nullable()->unique();
            $table->string('og_image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
