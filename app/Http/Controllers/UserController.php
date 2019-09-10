<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(Request $request)
    {
        if ($request->input('quantity') == 1) {
            $user = User::create($request->all());
            return response()->json($user, 200);
        } else {
            $users = array();
            $quantity = $request->input('quantity');
            $room_type_id = $request->input('room_type_id');
            $now = Carbon::now();
            for ($i = 0; $i < $quantity; $i++) {
                $users[$i] = ["room_type_id" => $room_type_id, "id" => Str::uuid(), 'updated_at' => $now, 'created_at' => $now];
            }
            User::insert($users);
            return response()->json([
                "message" => "Operation successful!"
            ], 200);
        }
    }

    public function getAll()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function getOne($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                "status" => 404,
                "message" => "No user found"
            ], 404);
        } else {
            return response()->json($user, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                "status" => 404,
                "message" => "No user found"
            ], 404);
        } else {
            $user->fill([
                'email' => $request->email, 
                'password' => $request->password, 
                'role' => $request->role, 
                'honorific' => $request->honorific, 
                'firstname' => $request->firstname, 
                'lastname' => $request->lastname, 
                'middlename' => $request->middlename, 
                'contactno' => $request->contactno, 
                'address' => $request->address
            ]);
            $user->save();
            return response()->json($user, 200);
        }
    }

    public function deleteOne($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                "status" => 200,
                "message" => "No user found"
            ], 404);
        } else {
            User::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }
    public function getGuestUsers(){
        $users = User::where('role', 'USER')->get();
        return response()->json($users,200);
    }
}
