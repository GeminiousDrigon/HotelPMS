<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RoomGuest;

class RoomGuestController extends Controller
{
    public function create(Request $request)
    {
        $roomGuest = RoomGuest::create($request->all());
        return response()->json($roomGuest, 200);
    }

    public function getAll()
    {
        $roomGuests = RoomGuest::all();
        return response()->json($roomGuests, 200);
    }

    public function getOne($id)
    {
        $roomGuest = RoomGuest::find($id);
        if (!$roomGuest) {
            return response()->json([
                "status" => 404,
                "message" => "No guest found"
            ], 404);
        } else {
            return response()->json($roomGuest, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $roomGuest = RoomGuest::find($id);
        if (!$roomGuest) {
            return response()->json([
                "status" => 404,
                "message" => "No guest found"
            ], 404);
        } else {
            $roomGuest->fill([
                'firstname'=> $request->firstname, 
                'middlename'=> $request->middlename, 
                'lastname'=> $request->lastname, 
                'email'=> $request->email, 
                'address'=> $request->address, 
                'country'=> $request->country, 
                'contactno'=> $request->contactno, 
                'book_room_id'=> $request->book_room_id,
            ]);
            $roomGuest->save();
            return response()->json($roomGuest, 200);
        }
    }

    public function deleteOne($id)
    {
        $roomGuest = RoomGuest::find($id);
        if (!$roomGuest) {
            return response()->json([
                "status" => 404,
                "message" => "No guest found"
            ], 404);
        } else {
            RoomGuest::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }
}
