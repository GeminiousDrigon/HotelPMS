<?php

use App\Room;
use App\RoomType;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $roomTypes = RoomType::all();

        for ($i=0; $i < count($roomTypes); $i++) { 
            # code...
            Room::create([
                'room_number' => $i."01", 
                'room_type_id' => $roomTypes[$i]->id
            ]);
            // Room::create([
            //     'room_number' => $i."02", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."03", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."04", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."05", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."06", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."07", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."08", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."09", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
            // Room::create([
            //     'room_number' => $i."10", 
            //     'room_type_id' => $roomTypes[$i]->id
            // ]);
        }
       

    }
}
