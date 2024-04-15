<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        for ($i = 0; $i < 10; $i++) {
            $user = $users->random();
            Course::factory()->create(['primary_coordinator_id' => $user->id]);
        }
    }
}
