<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Coordinator;
use App\Models\Course;
use App\Models\User;

class CoordinatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $courses = Course::all();

        foreach ($users as $user) {
            $coursesToCoordinate = $courses->random(rand(1, 3));

            foreach ($coursesToCoordinate as $course) {
                Coordinator::create([
                    'course_id' => $course->id,
                    'user_id' => $user->id
                ]);
            }
        }
    }
}
