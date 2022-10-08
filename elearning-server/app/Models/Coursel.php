<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'title',
        'subject',
        'description',
        'credits_number',
        'price',
        'instructors',
        'students'
    ];
}