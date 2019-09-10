<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getGuestUsers(){
        $users = User::where('role', 'USER')->get();
        return response()->json($users,200);
    }
}
