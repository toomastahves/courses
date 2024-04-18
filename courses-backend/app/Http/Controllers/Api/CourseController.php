<?php

namespace App\Http\Controllers\Api;

use App\Enums\StudyLevel;
use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CourseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/courses/",
     *     summary="Get list of courses",
     *     tags={"Courses"},
     *     @OA\Response(
     *         response=200,
     *         description="OK"
     *     )
     * )
     */
    public function index()
    {
        return CourseResource::collection(Course::with('primaryCoordinator')->orderBy('created_at', 'asc')->get());
    }

    /**
     * @OA\Post(
     *     path="/api/v1/courses/{id}",
     *     summary="Creates a course",
    *      tags={"Courses"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="id",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     oneOf={
     *                     	   @OA\Schema(type="string")
     *                     }
     *                 ),
     *                 example={"id": "123", "name": "Math", "description": "Good course"}
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
    public function store(Request $request)
    {
        $course = Course::create([
            ...$request->validate([
                'name' => 'required|max:200',
                'description' => 'nullable|string|max:2000',
                'study_load' => 'required|min:0|max:30',
                'level' => ['required', Rule::in(StudyLevel::cases())],
                'start_date' => 'required|date|after:yesterday',
                'course_length_in_days' => 'required|min:0|max:365',
                'primary_coordinator_id' => ['required', 'string', Rule::exists('users', 'id')->where('id', $request->primary_coordinator_id)]
            ]),
            'end_date' => $this->createEndDate($request)
        ]);
        $course->load('primaryCoordinator', 'coordinators', 'coordinators.user');
        return new CourseResource($course);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/courses/{id}",
     *     summary="Get course by ID",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         description="Course ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="int", value="1", summary="An int value.")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK"
     *     )
     * )
     */
    public function show(Course $course)
    {
        $course->load('primaryCoordinator', 'coordinators', 'coordinators.user');
        return new CourseResource($course);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/courses/{id}",
     *     summary="Updates a course",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         description="Course ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="int", value="1", summary="An int value.")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK"
     *     )
     * )
     */
    public function update(Request $request, Course $course)
    {
        $course->update([
            ...$request->validate([
                'name' => 'sometimes|max:200',
                'description' => 'nullable|string|max:2000',
                'study_load' => 'sometimes|min:0|max:30',
                'level' => ['required', Rule::in(StudyLevel::cases())],
                'start_date' => 'sometimes|date',
                'course_length_in_days' => 'sometimes|min:0|max:365',
                'primary_coordinator_id' => ['sometimes', 'string', Rule::exists('users', 'id')->where('id', $request->primary_coordinator_id)]
            ]),
            'end_date' => $this->createEndDate($request)
        ]);
        $course->load('primaryCoordinator', 'coordinators', 'coordinators.user');
        return new CourseResource($course);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/courses/{id}",
     *     summary="Deletes a course",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         description="Course ID",
     *         in="path",
     *         name="id",
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
