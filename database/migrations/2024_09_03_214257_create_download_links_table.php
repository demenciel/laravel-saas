<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDownloadLinksTable extends Migration
{
    public function up()
    {
        Schema::create('download_links', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('session_id')->unique();
            $table->boolean('downloaded')->default(false);
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('download_links');
    }
}
