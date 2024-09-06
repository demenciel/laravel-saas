<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DownloadLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'session_id',
        'downloaded',
        'sent_at',
        'product',
    ];
}
