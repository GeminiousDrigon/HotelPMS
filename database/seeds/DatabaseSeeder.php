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
        $this->call(RoleSeeder::class);
        $this->call(AmenitySeeder::class);
        $this->call(RoomTypeSeeder::class);
        $this->call(RateSeeder::class);
        $this->call(RoomSeeder::class);
        $this->call(UserSeeder::class);
    }
}
