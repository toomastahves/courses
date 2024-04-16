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
        return CourseResource::collection(Course::with('primaryCoordinator')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $course = Course::create([
            ...$request->validate([
                'name' => 'required|max:200',
                'description' => 'nullable|string|max:2000',
                'study_load' => 'required|min:0|max:30',
                'level' => 'required|in:Bachelor,Master,Doctoral',
                'start_date' => 'required|date|after:yesterday',
                'course_length_in_days' => 'required|min:0|max:365',
                'primary_coordinator_id' => 'required|numeric'
            ]),
            'end_date' => $this->createEndDate($request)
        ]);
        $course->load('primaryCoordinator', 'coordinators', 'coordinators.user');
        return new CourseResource($course);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load('primaryCoordinator', 'coordinators', 'coordinators.user');
        return new CourseResource($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $course->update([
            ...$request->validate([
                'name' => 'sometimes|max:200',
                'description' => 'nullable|string|max:2000',
                'study_load' => 'sometimes|min:0|max:30',
                'level' => 'sometimes|in:Bachelor,Master,Doctoral',
                'start_date' => 'sometimes|date|after:yesterday',
                'course_length_in_days' => 'sometimes|min:0|max:365'
            ]),
            'end_date' => $this->createEndDate($request)
        ]);
        $course->load('primaryCoordinator', 'coordinators', 'coordinators.user');
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

    /**
     * Generates end date using start date and length of course in days
     * end_date = start_date + course_length_in_days
     */
    private function createEndDate($request)
    {
        $endDate = Carbon::createFromDate($request['start_date']);
        $endDate->addDays($request['course_length_in_days']);
        return $endDate->format('Y-m-d');
    }
}
