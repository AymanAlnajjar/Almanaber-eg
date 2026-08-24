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
        Schema::create('about_page_settings', function (Blueprint $table) {
            $table->id();
            // Hero Section
            $table->string('hero_title_en');
            $table->string('hero_title_ar');
            $table->text('hero_subtitle_en');
            $table->text('hero_subtitle_ar');
            $table->string('hero_background_image');

            // Who We Are Section
            $table->string('who_we_are_title_en');
            $table->string('who_we_are_title_ar');
            $table->longText('who_we_are_content_en');
            $table->longText('who_we_are_content_ar');

            // Our Values Section
            $table->string('values_section_title_en');
            $table->string('values_section_title_ar');

            // Leadership Section
            $table->string('leadership_title_en');
            $table->string('leadership_title_ar');

            // Awards Section
            $table->string('awards_title_en');
            $table->string('awards_title_ar');

            // Download Portfolio Section
            $table->string('portfolio_title_en');
            $table->string('portfolio_title_ar');
            $table->text('portfolio_description_en');
            $table->text('portfolio_description_ar');
            $table->string('portfolio_button_text_en');
            $table->string('portfolio_button_text_ar');
            $table->string('portfolio_file')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_page_settings');
    }
};
