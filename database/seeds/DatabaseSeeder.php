<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AmenitySeeder::class);
        $this->call(RoomTypeSeeder::class);
        $this->call(RateSeeder::class);
        $this->call(RoomSeeder::class);
    }
}
