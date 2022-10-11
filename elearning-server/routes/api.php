<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function () {

    ###########Start admin,instructor,student roles group###########
    Route::group(['midleware' => 'role:admin,instructor,student'], function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });
    ###########Start Admin admin,instructor,student roles group###########

    ###########Start users group###########
    Route::group(['prefix' => 'users'], function () {

        ###########Start admin, instructor roles group###########
        Route::group(['middleware' => 'role:admin'], function () {
            Route::get('/instructors', [UserController::class, 'getInstructors']);
        });
        ###########Start admin, instructor roles group###########

        ###########Start admin, instructor roles group###########
        Route::group(['middleware' => 'role:admin, instructor'], function () {
            Route::post('add_user', [UserController::class, 'addUser']);
            Route::get('/students', [UserController::class, 'getStudents']);
        });
        ###########Start admin, instructor roles group###########


    });
    ###########End users group###########

    ###########Start courses group###########
    Route::group(['prefix' => 'courses'], function () {

        ###########Start Admin Role group###########
        Route::group(['midleware' => 'role:admin'], function () {
            Route::get('/', [CourseController::class, 'getCourses']);
            Route::post('/', [CourseController::class, 'addCourse']);
            Route::get('assign/instructor/{instructor_id}/{course_id}', [CourseController::class, 'assignInstructorToCourse']);
        });
        ###########End Admin Role group###########

        ###########Start instructor Role group###########
        Route::group(['midleware' => 'role:instructor'], function () {
            Route::get('assign/student/{student_id}/{course_id}', [CourseController::class, 'assignStudentToCourse']);
            Route::get('/instructors/{instructor_id}', [CourseController::class, 'getInstructorCourses']);
        });
        ###########End instructor Role group###########

        ###########Start student Role group###########
        Route::group(['midleware' => 'role:student'], function () {
            Route::get('get_courses', [CourseController::class, 'getEnrolledCourses']);
        });
        ###########End student Role group###########
    });
    ###########End courses group###########

    ###########Start assignments group###########
    Route::group(['prefix' => 'assignments'], function () {

        ###########Start instructor Role group###########
        Route::group(['midleware' => 'role:instructor'], function () {
            Route::post('/', [AssignmentController::class, 'addAssignment']);
            Route::get('/{path}', [AssignmentController::class, 'getAssignmentFile'])->where('path', '.*');;
        });
        ###########End instructor Role group###########

        ###########Start student Role group###########
        Route::group(['midleware' => 'role:student'], function () {
            Route::post('submit/{id}', [AssignmentController::class, 'submitAssignment']);
        });
        ###########End student Role group###########

        ###########Start All Roles group###########
        Route::group(['midleware' => 'role:student, instructor'], function () {
            Route::get('/', [AssignmentController::class, 'getAssignments']);
        });
        ###########End student Role group###########
    });
    ###########End assignments group###########

    ###########Start announcements group###########
    Route::group(['prefix' => 'announcements'], function () {

        ###########Start instructor Role group###########
        Route::group(['midleware' => 'role:instructor'], function () {
            Route::post('add_announcement', [AnnouncementController::class, 'addAnnouncement']);
        });
        ###########End instructor Role group###########
    });
    ###########End announcements group###########

});