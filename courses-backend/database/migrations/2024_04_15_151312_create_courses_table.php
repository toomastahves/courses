<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            $table->uuid('course_id')->unique()->default(DB::raw('(UUID())'));
            $table->string('name', 200);
            $table->string('description', 2000)->nullable();
            $table->integer('study_load');
            $table->string('level');
            $table->date('start_date');
            $table->integer('course_length_in_days');
            $table->date('end_date');

            $table->foreignId('primary_coordinator_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
