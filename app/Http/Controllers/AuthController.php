<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'USER'
        ])) {

            $user = User::find(Auth::id());
            $token = $user->createToken("hello", [])->accessToken;

            $responseContent = json_encode([
                'status' => 200,
                'access_token' => $token,
                'user_id' => $user->id,
                'user' => $user,
                'message' => 'Successful'
            ]);

            return response($responseContent)->cookie('name', $token, 20160);
        } elseif (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'ADMIN'
        ])) {
            $user = User::find(Auth::id());
            $token = $user->createToken("hello", [])->accessToken;

            $responseContent = json_encode([
                'status' => 200,
                'access_token' => $token,
                'user_id' => $user->id,
                'user' => $user,
                'message' => 'Successful'
            ]);

            return response($responseContent)->cookie('name', $token, 20160);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized'
            ], 401);
        }
    }

    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function createAdminAccount(Request $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make($request->input('password'));
        $data['role'] = 'ADMIN';

        $user = User::create($data);


        return response($user, 200);
    }

    public function createGuestUser(Request $request)
    {

        $data = $request->all();
        $data['password'] = Hash::make($data->password);
        $data['role'] = 'USER';

        $user = User::create($data);


        return response($user, 200);
    }
}
