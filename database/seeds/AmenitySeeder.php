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
            "name" => "Cable Television",
            "icon" => "personal_video"
        ]);
        Amenity::create([
            "name" => "Individually controlled air-conditioning",
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
            "name" => "Free Wifi",
            "icon" => "wifi"
        ]);
        Amenity::create([
            "name" => "Telephone",
            "icon" => "phone"
        ]);
    }
}
