<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'courses';

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

    public function instructors()
    {
        return $this->belongsToMany(User::class, 'courses', 'course_id', 'instructor_id')->withTimestamps();
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'courses', 'course_id', 'student_id')->withTimestamps();
    }
}