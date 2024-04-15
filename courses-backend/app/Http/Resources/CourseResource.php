<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->course_id,
            'name' => $this->name,
            'description' => $this->description,
            'study_load' => $this->study_load,
            'level' => $this->level,
            'start_date' => $this->start_date,
            'course_length_in_days' => $this->course_length_in_days,
            'end_date' => $this->end_date,
            'primary_coordinator' => new UserResource($this->whenLoaded('primaryCoordinator')),
            'coordinators' => CoordinatorResource::collection($this->whenLoaded(('coordinators')))
        ];
    }
}
