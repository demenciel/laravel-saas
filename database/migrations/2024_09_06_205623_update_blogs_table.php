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
        Schema::table('blogs', function (Blueprint $table) {
            $table->foreignId('author_id')->constrained('users');
            // remove content column
            $table->dropColumn('content');
            $table->text('header')->nullable();
            $table->text('sub_header')->nullable();
            $table->text('body')->nullable();
            // add fields for seo
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->string('alt_text_image')->nullable();
            $table->string('meta_image')->nullable();
            $table->string('slug')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropForeign(['author_id']);
            $table->dropColumn('author_id');
            $table->text('content')->nullable();
            $table->dropColumn('header');
            $table->dropColumn('sub_header');
            $table->dropColumn('body');
            $table->dropColumn('meta_title');
            $table->dropColumn('meta_description');
            $table->dropColumn('meta_keywords');
            $table->dropColumn('alt_text_image');
            $table->dropColumn('meta_image');
            $table->dropColumn('slug');
        });
    }
};
