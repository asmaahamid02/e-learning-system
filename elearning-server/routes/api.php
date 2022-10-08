<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function () {

    ###########Start users group###########
    Route::group(['prefix' => 'users'], function () {

        ###########Start admin, instructor roles group###########
        Route::group(['middleware' => 'role:admin, instructor'], function () {
            Route::post('add_user', [UserController::class, 'addUser']);
        });
        ###########Start admin, instructor roles group###########

        ###########Start admin,instructor,student roles group###########
        Route::group(['midleware' => 'role:admin,instructor,student'], function () {
            Route::post('logout', [AuthController::class, 'logout']);
        });
        ###########Start Admin admin,instructor,student roles group###########
    });
    ###########End users group###########

    ###########Start courses group###########
    Route::group(['prefix' => 'courses'], function () {

        ###########Start Admin Role group###########
        Route::group(['midleware' => 'role:admin'], function () {
            Route::post('add_course', [CourseController::class, 'addCourse']);
            Route::get('get_course', [CourseController::class, 'getCourse']);
        });
        ###########End Admin Role group###########
    });
    ###########End courses group###########

    ###########Start assignments group###########
    Route::group(['prefix' => 'assignments'], function () {

        ###########Start instructor Role group###########
        Route::group(['midleware' => 'role:instructor'], function () {
            Route::post('add_assignment', [AssignmentController::class, 'addAssignment']);
            Route::get('get_assignment/{path}', [AssignmentController::class, 'getAssignment']);
        });
        ###########End instructor Role group###########
    });
    ###########End assignments group###########

});