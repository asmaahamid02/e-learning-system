<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)->create('collections', function (Blueprint $table) {
            $table->string('code')->unique();
            $table->string('title');
            $table->string('subject');
            $table->text('description');
            $table->integer('credits_number');
            $table->decimal('price');
            $table->array('instructors');
            $table->array('students');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}