<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    public function primaryCoordinator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'primary_coordinator_id', 'id');
    }

    public function coordinators(): HasMany
    {
        return $this->hasMany(Coordinator::class);
    }
}
