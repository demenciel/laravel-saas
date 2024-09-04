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
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            // update with common columns
            $table->string('status')->default('active');
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->foreignId('profile_photo_id')->nullable()->constrained('photos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['profile_photo_id']);
            $table->dropColumn('profile_photo_id');
            $table->dropColumn('status');
            $table->dropColumn('phone');
            $table->dropColumn('address');
        });
    }
};
