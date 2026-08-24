<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Move projects from a single `type` / `service` to multi-valued
     * `types` / `services` JSON arrays. A project can now belong to several
     * types and be tagged with several services, so it can appear under any
     * of those filters.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('types')->nullable()->after('type');
            $table->json('services')->nullable()->after('service');
        });

        // Backfill: wrap each existing single value into a one-element array so
        // no data is lost. JSON_ARRAY('housing') => ["housing"].
        DB::statement("UPDATE projects SET types = JSON_ARRAY(type) WHERE type IS NOT NULL AND type <> ''");
        DB::statement("UPDATE projects SET services = JSON_ARRAY(service) WHERE service IS NOT NULL AND service <> ''");

        // The legacy single-value columns are no longer written to by the app,
        // so relax the NOT NULL constraint (kept, not dropped, as a safety net).
        Schema::table('projects', function (Blueprint $table) {
            $table->string('type')->nullable()->change();
            $table->string('service')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['types', 'services']);
        });
    }
};
