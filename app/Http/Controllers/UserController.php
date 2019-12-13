<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

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
        $users = User::with('role')->get();
        return response()->json($users, 200);
    }

    public function getOne($id)
    {
        $user = User::with('role')->find($id);
        if (!$user) {
            return response()->json([
                "status" => 404,
                "message" => "No user found"
            ], 404);
        } else {
            if ($user->role === "User") {
                return response()->json([
                    "message" => "AccountUserException"
                ]);
            } else {
                return response()->json($user, 200);
            }
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
    public function getGuestUsers()
    {
        $users = User::where('role_id', 1)->get();
        return response()->json($users, 200);
    }

    public function getAdminAccounts()
    {
        $users = User::where('role_id', '!=', 1)->with('role')->get();
        return response()->json($users, 200);
    }


    public function checkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users',
        ]);

        if ($validator->fails()) {
            $user = User::where('email', $request->email)->first();
            if ($user->role === "ADMIN")
                return response()->json([
                    "code" => "EmailHasTaken"
                ], 500);
            else return response()->json("OK", 200);
        } else {
            return response()->json("OK", 200);
        }
    }

    public function getUserBookings($id, Request $request)
    {
        $user = User::with(['bookings' => function ($query) {
            $query->with(['user', 'rooms', 'billings'])->orderBy('from_date', 'desc');
        }])->find($id);
        $bookings = $user->bookings;
        return response()->json($bookings, 200);
    }
}
