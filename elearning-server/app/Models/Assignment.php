<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'assignments';

    protected $fillable = [
        'instructor_id',
        'title',
        'file_path',
        'deadline',
    ];

    public function students()
    {
        return $this->belongsToMany(User::class, 'users', 'assignment_id', 'student_id');
    }
}