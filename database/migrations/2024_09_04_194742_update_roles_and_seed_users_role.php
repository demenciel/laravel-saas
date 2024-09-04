<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('roles')->where('id', 3)->update(['name' => 'developer']);
        DB::table('roles')->where('id', 4)->update(['name' => 'seeder']);

        DB::table('users')->update(['role_id' => 4]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('roles')->where('id', 3)->update(['name' => 'developer']);
        DB::table('roles')->where('id', 4)->update(['name' => 'seeder']);

        DB::table('users')->update(['role_id' => 4]);
    }
};
