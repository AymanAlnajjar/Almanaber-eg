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
        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');

            // Where the submission came from:
            //   "contact-page", "service:Landscape Design", "project:Villa X", etc.
            $table->string('source')->default('contact-page');

            // Lifecycle
            $table->boolean('is_read')->default(false);
            $table->boolean('is_archived')->default(false);

            // Request metadata (useful for spam / audit)
            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent', 512)->nullable();
            $table->string('locale', 8)->nullable();

            $table->timestamps();

            $table->index('source');
            $table->index('is_read');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_submissions');
    }
};
