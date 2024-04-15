<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CourseResource::collection(Course::with('primaryCoordinator', 'coordinators')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $course = Course::create([...$request->validate([
            'name' => 'required|max:200',
            'description' => 'nullable|string|max:2000',
            'study_load' => 'required|min:0|max:30',
            'level' => 'required|in:bachelor,master,doctoral',
            'start_date' => 'required|date|after:today',
            'course_length_in_days' => 'required|min:0|max:365'
        ]), 'primary_coordinator_id' => 1, 'end_date' => new Carbon()]);

        return new CourseResource($course);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load('primaryCoordinator', 'coordinators');
        return new CourseResource($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $course->update($request->validate([
            'name' => 'sometimes|max:200',
            'description' => 'nullable|string|max:2000',
            'study_load' => 'sometimes|min:0|max:30',
            'level' => 'sometimes|in:bachelor,master,doctoral',
            'start_date' => 'sometimes|date|after:today',
            'course_length_in_days' => 'sometimes|min:0|max:365'
        ]));

        return new CourseResource($course);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response(status: 204);
    }
}
