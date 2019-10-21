<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookRoomRoomGuestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_room_room_guest', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('book_room_id');
            $table->foreign('book_room_id')->references('id')->on('book_rooms');
            $table->uuid('room_guest_id');
            $table->foreign('room_guest_id')->references('id')->on('room_guests');
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
        Schema::dropIfExists('book_room_room_guests');
    }
}
