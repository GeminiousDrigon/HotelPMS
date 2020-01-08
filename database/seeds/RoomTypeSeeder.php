<?php

use App\Amenity;
use App\Room;
use Illuminate\Database\Seeder;

use App\RoomType;

class RoomTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

 
        $room = RoomType::create([
          'name' => "Single Room",
          'room_size' => "9",
          'bed_no' => "1",
          'bed_type' => "SINGLE",
          'max_guest' => "1",
          'room_size_unit' => "m",
          'description' => "A small and simple room offering everything necessary for a comfortable stay."]);
        $room2 = RoomType::create([
          'name' => "Double Room",
          'room_size' => "9",
          'bed_no' => "1",
          'bed_type' => "DOUBLE",
          'max_guest' => "2",
          'room_size_unit' => "m",
          'description' => "A room assigned to two people. May have one or more beds."]);
        $room3 = RoomType::create([
            'name' => "Native Room",
            'room_size' => "8",
            'bed_no' => "1",
            'bed_type' => "SINGLE",
            'max_guest' => "2",
            'room_size_unit' => "m",
            'description' => "A room with a single sized bed.A room the most comfortable and feel relaxing."     ]);
        $room4 = RoomType::create([
            'name' => "Master Room",
            'room_size' => "15",
            'bed_no' => "1",
            'bed_type' => "KING",
            'max_guest' => "8",
            'room_size_unit' => "m",
            'description' => "A room with a king-sized bed. May be occupied by one or more people."       ]);

        $rooms = array($room, $room2, $room3, $room4);
        foreach ($rooms as $room => $value) {
            # code...
            $amenities = Amenity::all();
            foreach ($amenities as $amenity) {
                # code...
                $value->amenities()->attach($amenity->id);
            }
        }
    }
}
