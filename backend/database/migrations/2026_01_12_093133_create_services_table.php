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
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            // Multilingual fields - English
            $table->string('title_en');
            $table->text('description_en');
            $table->longText('details_en');

            // Multilingual fields - Arabic
            $table->string('title_ar');
            $table->text('description_ar');
            $table->longText('details_ar');

            // Images
            $table->string('icon')->nullable();
            $table->string('background_image')->nullable();

            // Display settings
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
