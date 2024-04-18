<?php

namespace Database\Factories;

use App\Enums\StudyLevel;
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
            'level' => fake()->randomElement(StudyLevel::cases()),
            'start_date' => fake()->dateTimeBetween('now', '+1 year'),
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
