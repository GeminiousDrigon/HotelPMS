<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdditionalBookRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('additional_booking', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('price');
            $table->uuid('additional_id');
            $table->foreign('additional_id')->references('id')->on('additionals');
            $table->uuid('booking_id');
            $table->foreign('booking_id')->references('id')->on('bookings');
            $table->integer('quantity');
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
        Schema::dropIfExists('additional_book_room');
    }
}
