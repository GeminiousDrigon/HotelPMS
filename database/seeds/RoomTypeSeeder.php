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
            'room_size' => "50",
            'bed_no' => "1",
            'bed_type' => "SINGLE",
            'max_guest' => "2",
            'room_size_unit' => "m",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat quis eros sit amet iaculis. Donec mollis dui sed urna pulvinar, eu consectetur mi mattis. Integer molestie sapien a lectus malesuada, vitae fringilla augue dapibus. In eu nunc pulvinar erat luctus imperdiet in in nulla. Ut ornare mattis dolor, ut suscipit ante placerat eu. Nullam convallis magna magna, feugiat pretium nulla aliquam vel. Nulla elementum, enim at faucibus tempor, dolor quam imperdiet magna, nec volutpat enim lectus quis felis. Praesent sit amet neque ullamcorper, accumsan ante in, euismod urna. Etiam metus massa, sodales sed congue vel, posuere auctor eros. Cras non ultrices orci. Donec elementum gravida arcu, vel scelerisque lacus varius vel. Vivamus sed placerat sem. Vestibulum dignissim lacus eros, at volutpat tortor egestas vitae.",
        ]);
        $room2 = RoomType::create([
            'name' => "Double Room",
            'room_size' => "75",
            'bed_no' => "1",
            'bed_type' => "DOUBLE",
            'max_guest' => "2",
            'room_size_unit' => "cm",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat quis eros sit amet iaculis. Donec mollis dui sed urna pulvinar, eu consectetur mi mattis. Integer molestie sapien a lectus malesuada, vitae fringilla augue dapibus. In eu nunc pulvinar erat luctus imperdiet in in nulla. Ut ornare mattis dolor, ut suscipit ante placerat eu. Nullam convallis magna magna, feugiat pretium nulla aliquam vel. Nulla elementum, enim at faucibus tempor, dolor quam imperdiet magna, nec volutpat enim lectus quis felis. Praesent sit amet neque ullamcorper, accumsan ante in, euismod urna. Etiam metus massa, sodales sed congue vel, posuere auctor eros. Cras non ultrices orci. Donec elementum gravida arcu, vel scelerisque lacus varius vel. Vivamus sed placerat sem. Vestibulum dignissim lacus eros, at volutpat tortor egestas vitae.",
        ]);
        $room3 = RoomType::create([
            'name' => "Twin Room",
            'room_size' => "65",
            'bed_no' => "2",
            'bed_type' => "SINGLE",
            'max_guest' => "2",
            'room_size_unit' => "m",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat quis eros sit amet iaculis. Donec mollis dui sed urna pulvinar, eu consectetur mi mattis. Integer molestie sapien a lectus malesuada, vitae fringilla augue dapibus. In eu nunc pulvinar erat luctus imperdiet in in nulla. Ut ornare mattis dolor, ut suscipit ante placerat eu. Nullam convallis magna magna, feugiat pretium nulla aliquam vel. Nulla elementum, enim at faucibus tempor, dolor quam imperdiet magna, nec volutpat enim lectus quis felis. Praesent sit amet neque ullamcorper, accumsan ante in, euismod urna. Etiam metus massa, sodales sed congue vel, posuere auctor eros. Cras non ultrices orci. Donec elementum gravida arcu, vel scelerisque lacus varius vel. Vivamus sed placerat sem. Vestibulum dignissim lacus eros, at volutpat tortor egestas vitae.",
        ]);
        $room4 = RoomType::create([
            'name' => "King Room",
            'room_size' => "75",
            'bed_no' => "1",
            'bed_type' => "KING",
            'max_guest' => "2",
            'room_size_unit' => "m",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat quis eros sit amet iaculis. Donec mollis dui sed urna pulvinar, eu consectetur mi mattis. Integer molestie sapien a lectus malesuada, vitae fringilla augue dapibus. In eu nunc pulvinar erat luctus imperdiet in in nulla. Ut ornare mattis dolor, ut suscipit ante placerat eu. Nullam convallis magna magna, feugiat pretium nulla aliquam vel. Nulla elementum, enim at faucibus tempor, dolor quam imperdiet magna, nec volutpat enim lectus quis felis. Praesent sit amet neque ullamcorper, accumsan ante in, euismod urna. Etiam metus massa, sodales sed congue vel, posuere auctor eros. Cras non ultrices orci. Donec elementum gravida arcu, vel scelerisque lacus varius vel. Vivamus sed placerat sem. Vestibulum dignissim lacus eros, at volutpat tortor egestas vitae.",
        ]);
        $room5 = RoomType::create([
            'name' => "Queen Room",
            'room_size' => "75",
            'bed_no' => "1",
            'bed_type' => "QUEEN",
            'max_guest' => "2",
            'room_size_unit' => "m",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat quis eros sit amet iaculis. Donec mollis dui sed urna pulvinar, eu consectetur mi mattis. Integer molestie sapien a lectus malesuada, vitae fringilla augue dapibus. In eu nunc pulvinar erat luctus imperdiet in in nulla. Ut ornare mattis dolor, ut suscipit ante placerat eu. Nullam convallis magna magna, feugiat pretium nulla aliquam vel. Nulla elementum, enim at faucibus tempor, dolor quam imperdiet magna, nec volutpat enim lectus quis felis. Praesent sit amet neque ullamcorper, accumsan ante in, euismod urna. Etiam metus massa, sodales sed congue vel, posuere auctor eros. Cras non ultrices orci. Donec elementum gravida arcu, vel scelerisque lacus varius vel. Vivamus sed placerat sem. Vestibulum dignissim lacus eros, at volutpat tortor egestas vitae.",
        ]);

        $rooms = array($room, $room2, $room3, $room4, $room5);
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
