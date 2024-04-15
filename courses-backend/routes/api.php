<?php

use App\Http\Controllers\Api\CoordinatorController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Support\Facades\Route;

Route::apiResource('courses', CourseController::class);
Route::apiResource('courses.coordinators', CoordinatorController::class)->scoped()->except(['update']);
