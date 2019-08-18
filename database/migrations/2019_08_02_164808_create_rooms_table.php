<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->boolean('private_bath');
            $table->boolean('free_parking');
            $table->integer('room_size');
            $table->char('room_size_unit')->default('m');
            $table->string('description');
            $table->integer('price');
            $table->boolean('non_refundable');
            $table->integer('quantity');
            $table->string('type');
            $table->integer('max_guest');
            $table->integer('max_add_guest');
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
        Schema::dropIfExists('rooms');
    }
}
