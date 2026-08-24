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
        // Add SEO fields to projects table
        Schema::table('projects', function (Blueprint $table) {
            $table->string('meta_title_en')->nullable()->after('sort_order');
            $table->string('meta_title_ar')->nullable()->after('meta_title_en');
            $table->text('meta_description_en')->nullable()->after('meta_title_ar');
            $table->text('meta_description_ar')->nullable()->after('meta_description_en');
            $table->string('meta_keywords_en')->nullable()->after('meta_description_ar');
            $table->string('meta_keywords_ar')->nullable()->after('meta_keywords_en');
            $table->string('slug_en')->nullable()->unique()->after('meta_keywords_ar');
            $table->string('slug_ar')->nullable()->unique()->after('slug_en');
            $table->string('og_image')->nullable()->after('slug_ar');
        });

        // Add SEO fields to news table
        Schema::table('news', function (Blueprint $table) {
            $table->string('meta_title_en')->nullable()->after('sort_order');
            $table->string('meta_title_ar')->nullable()->after('meta_title_en');
            $table->text('meta_description_en')->nullable()->after('meta_title_ar');
            $table->text('meta_description_ar')->nullable()->after('meta_description_en');
            $table->string('meta_keywords_en')->nullable()->after('meta_description_ar');
            $table->string('meta_keywords_ar')->nullable()->after('meta_keywords_en');
            $table->string('slug_en')->nullable()->unique()->after('meta_keywords_ar');
            $table->string('slug_ar')->nullable()->unique()->after('slug_en');
            $table->string('og_image')->nullable()->after('slug_ar');
        });

        // Add SEO fields to services table
        Schema::table('services', function (Blueprint $table) {
            $table->string('meta_title_en')->nullable()->after('sort_order');
            $table->string('meta_title_ar')->nullable()->after('meta_title_en');
            $table->text('meta_description_en')->nullable()->after('meta_title_ar');
            $table->text('meta_description_ar')->nullable()->after('meta_description_en');
            $table->string('meta_keywords_en')->nullable()->after('meta_description_ar');
            $table->string('meta_keywords_ar')->nullable()->after('meta_keywords_en');
            $table->string('slug_en')->nullable()->unique()->after('meta_keywords_ar');
            $table->string('slug_ar')->nullable()->unique()->after('slug_en');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title_en', 'meta_title_ar',
                'meta_description_en', 'meta_description_ar',
                'meta_keywords_en', 'meta_keywords_ar',
                'slug_en', 'slug_ar', 'og_image',
            ]);
        });

        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title_en', 'meta_title_ar',
                'meta_description_en', 'meta_description_ar',
                'meta_keywords_en', 'meta_keywords_ar',
                'slug_en', 'slug_ar', 'og_image',
            ]);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title_en', 'meta_title_ar',
                'meta_description_en', 'meta_description_ar',
                'meta_keywords_en', 'meta_keywords_ar',
                'slug_en', 'slug_ar',
            ]);
        });
    }
};
