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
            "firstname" => "Anecita",
            "middlename" => "Bautista",
            "lastname" => "Ceniza",
            "email" => "administrator@gmail.com",
            "password" => '$2y$12$//7oZunML/cx3MaKOJemvepsuCSAVQP2TDE5PqmHd8TbSi4efayLu',
            "password_updated" => 1,
            "contactno" => "+639361180320",
            "role_id" => 2
        ]);
    }
}
