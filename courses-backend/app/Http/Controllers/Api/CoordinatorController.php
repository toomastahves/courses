<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CoordinatorResource;
use App\Models\Coordinator;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
     * @OA\Post(
     *     path="/api/v1/courses/{courseId}/coordinators",
     *     summary="Creates a coordinator",
    *      tags={"Coordinators"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="user_id",
     *                     type="string"
     *                 ),
     *                 example={"user_id": "123"}
     *             )
     *         )
     *     ),
     *     @OA\Parameter(
     *         description="Course ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="int", value="1", summary="An int value.")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="OK"
     *     )
     * )
     */
    public function store(Request $request, Course $course)
    {
        $coordinator = $course->coordinators()->create([
            ...$request->validate([
                'user_id' => Rule::exists('users', 'id')->where('id', $request->user_id),
                'course_id' => Rule::exists('courses', 'id')->where('id', $request->course_id)
            ])
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
     * @OA\Delete(
     *     path="/api/v1/courses/{courseId}/coordinators/{coordinatorId}",
     *     summary="Deletes a coordinator",
     *     tags={"Coordinators"},
     *     @OA\Parameter(
     *         description="Course ID",
     *         in="path",
     *         name="courseId",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="int", value="1", summary="An int value.")
     *     ),
     *     @OA\Parameter(
     *         description="Coordinator ID",
     *         in="path",
     *         name="coordinatorId",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="int", value="1", summary="An int value.")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="OK"
     *     )
     * )
     */
    public function destroy(Course $course, Coordinator $coordinator)
    {
        $coordinator->delete();
        return response(status: 204);
    }
}
