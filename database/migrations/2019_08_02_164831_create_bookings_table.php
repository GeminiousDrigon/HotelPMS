<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('from_date');
            $table->date('to_date');
            $table->uuid('user_id');
            $table->uuid('room_type_id');
            $table->uuid('room_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('room_type_id')->references('id')->on('room_types');
            $table->foreign('room_id')->references('id')->on('rooms');
            $table->integer('price');
            $table->boolean('with_breakfast');
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
        Schema::dropIfExists('bookings');
    }
}
