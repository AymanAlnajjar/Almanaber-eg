<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['news', 'projects', 'services'] as $table) {
            foreach (['meta_keywords_en', 'meta_keywords_ar'] as $col) {
                $tmp = $col . '_json';

                Schema::table($table, fn(Blueprint $t) => $t->json($tmp)->nullable()->after($col));

                DB::statement("UPDATE `{$table}` SET `{$tmp}` = JSON_ARRAY(`{$col}`) WHERE `{$col}` IS NOT NULL AND `{$col}` != ''");

                Schema::table($table, fn(Blueprint $t) => $t->dropColumn($col));

                Schema::table($table, fn(Blueprint $t) => $t->renameColumn($tmp, $col));
            }
        }
    }

    public function down(): void
    {
        foreach (['news', 'projects', 'services'] as $table) {
            foreach (['meta_keywords_en', 'meta_keywords_ar'] as $col) {
                $tmp = $col . '_str';

                Schema::table($table, fn(Blueprint $t) => $t->string($tmp)->nullable()->after($col));

                DB::statement("UPDATE `{$table}` SET `{$tmp}` = JSON_UNQUOTE(JSON_EXTRACT(`{$col}`, '$[0]')) WHERE `{$col}` IS NOT NULL");

                Schema::table($table, fn(Blueprint $t) => $t->dropColumn($col));

                Schema::table($table, fn(Blueprint $t) => $t->renameColumn($tmp, $col));
            }
        }
    }
};
