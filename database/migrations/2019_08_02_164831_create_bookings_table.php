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
            $table->dateTime('checkin_date')->nullable();
            $table->dateTime('checkout_date')->nullable();
            $table->string('status');
            $table->uuid('user_id');
            $table->uuid('room_type_id');
            $table->integer('guest_no');
            $table->uuid('room_id')->nullable();
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
