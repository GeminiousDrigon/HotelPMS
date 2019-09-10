<?php

use Illuminate\Database\Seeder;
use App\Rate;
use App\RoomType;
use Illuminate\Support\Str;

class RateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $rooms = RoomType::all();

        foreach ($rooms as $room) {
            # code...

            Rate::create([
                "id" => Str::uuid(),
                'sleep' => $room->max_guest,
                'price' => 200,
                'breakfast' => 0,
                'room_type_id' => $room->id,
                'name' => "Without breakfast"
            ]);
            Rate::create([
                "id" => Str::uuid(),
                'sleep' => $room->max_guest,
                'price' => 400,
                'breakfast' => 1,
                'room_type_id' => $room->id,
                'name' => "With breakfast"
            ]);
        }
    }
}
