<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->sentence(5, true),
            'description' => fake()->paragraph(2, true),
            'study_load' => fake()->numberBetween(0, 30),
            'level' => fake()->randomElement(['bachelor', 'master', 'doctoral']),
            'start_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'course_length_in_days' => fake()->numberBetween(0, 365),
            'end_date' => function (array $attributes) {
                $endDate = Carbon::createFromTimeStamp($attributes['start_date']->getTimestamp());
                $endDate->addDays($attributes['course_length_in_days']);
                return $endDate;
            },
            'primary_coordinator_id' => fake()->numberBetween(1, 10)
        ];
    }
}
