<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAmenityRoomTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('amenity_room_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('amenity_id');
            $table->foreign('amenity_id')->references('id')->on('amenities');
            $table->uuid('room_type_id');
            $table->foreign('room_type_id')->references('id')->on('room_types');
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
        Schema::dropIfExists('amenity_room_type');
    }
}
