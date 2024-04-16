<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'study_load',
        'level',
        'start_date',
        'course_length_in_days',
        'end_date',
        'primary_coordinator_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function primaryCoordinator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'primary_coordinator_id', 'id');
    }

    public function coordinators(): HasMany
    {
        return $this->hasMany(Coordinator::class);
    }
}
