<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'blogs';
    protected $fillable = [
        'title',
        'body',
        'sub_header',
        'image',
        'author_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_image',
        'alt_text_image',
        'slug'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function image()
    {
        return $this->hasOne(Photo::class, 'path', 'image');
    }
}
