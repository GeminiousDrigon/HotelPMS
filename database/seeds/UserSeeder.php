<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "firstname" => "Domenic",
            "middlename" => "Chuchu",
            "lastname" => "Vega",
            "email" => "dominic.vega@gmail.com",
            "password" => '$2y$12$//7oZunML/cx3MaKOJemvepsuCSAVQP2TDE5PqmHd8TbSi4efayLu',
            "password_updated" => 1,
            "role" => 'ADMIN'
        ]);
    }
}
