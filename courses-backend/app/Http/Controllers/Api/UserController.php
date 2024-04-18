<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/users/",
     *     summary="Get list of users",
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="OK"
     *     )
     * )
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }

}
