<?php

use App\Http\Controllers\Api\CoordinatorController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('courses', CourseController::class);
Route::apiResource('courses.coordinators', CoordinatorController::class)->scoped()->except(['update']);
Route::apiResource('users', UserController::class)->scoped()->only('index');
