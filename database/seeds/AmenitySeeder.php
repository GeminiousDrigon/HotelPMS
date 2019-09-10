<?php

use Illuminate\Database\Seeder;
use App\Amenity;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Amenity::create([
            "name" => "Restaurant",
            "icon" => "restaurant"
        ]);
        Amenity::create([
            "name" => "Television",
            "icon" => "personal_video"
        ]);
        Amenity::create([
            "name" => "Air Condition",
            "icon" => "ac_unit"
        ]);
        Amenity::create([
            "name" => "Fitness Gym",
            "icon" => "fitness_center"
        ]);
        Amenity::create([
            "name" => "Swimming Pool",
            "icon" => "pool"
        ]);
        Amenity::create([
            "name" => "Wifi",
            "icon" => "wifi"
        ]);
        Amenity::create([
            "name" => "Airport Pick-up",
            "icon" => "airplanemode_active"
        ]);
        Amenity::create([
            "name" => "Car rental",
            "icon" => "directions_car"
        ]);
    }
}
