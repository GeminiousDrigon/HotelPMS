<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_rooms', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('room_type_id');
            $table->uuid('room_id')->nullable();
            $table->string('color');
            $table->integer('price');
            $table->boolean('with_breakfast');
            $table->integer('guest_no');
            $table->uuid('booking_id');

            $table->foreign('room_type_id')->references('id')->on('room_types');
            $table->foreign('booking_id')->references('id')->on('bookings');
            $table->foreign('room_id')->references('id')->on('rooms');
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
        Schema::dropIfExists('book_rooms');
    }
}
