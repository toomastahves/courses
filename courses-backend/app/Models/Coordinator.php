<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coordinator extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'course_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public static function booted() {
        static::creating(function ($model) {
            $model->id = \Str::uuid();
        });
    }
}
