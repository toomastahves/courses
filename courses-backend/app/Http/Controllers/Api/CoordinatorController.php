<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CoordinatorResource;
use App\Models\Coordinator;
use App\Models\Course;
use Illuminate\Http\Request;

class CoordinatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Course $course)
    {
        return CoordinatorResource::collection($course->coordinators()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Course $course)
    {
        $coordinator = $course->coordinators()->create([
            'user_id' => $request->user_id,
            'course_id' => $course->id
        ]);

        return new CoordinatorResource($coordinator);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course, Coordinator $coordinator)
    {
        return new CoordinatorResource($coordinator);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course, Coordinator $coordinator)
    {
        $coordinator->delete();
        return response(status: 204);
    }
}
