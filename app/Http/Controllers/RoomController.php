<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Room;
use App\RoomType;

class RoomController extends Controller
{
    public function create(Request $request)
    {
        $room = Room::create($request->all());
        return response()->json($room, 200);
    }

    public function getAll()
    {
        $rooms = Room::all();
        return response()->json($rooms, 200);
    }

    public function getOne($id)
    {
        $room = Room::with('roomType')->find($id);
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        } else {
            return response()->json($room, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        } else {
            $room->fill([
                'room_number' => $request->room_number,
                'max_guest' => $request->max_guest,
                'max_add_guest' => $request->max_add_guest,
                'room_type_id' => $request->room_type_id
            ]);
            $room->save();
            return response()->json($room, 200);
        }
    }

    public function deleteOne($id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json([
                "status" => 200,
                "message" => "No room found"
            ], 404);
        } else {
            Room::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }

    public function getRoomType($id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        }
        $roomType = $room->roomType;
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No room type found"
            ], 404);
        }
        return response()->json($roomType, 200);
    }

    public function addRoomType(Request $request, $id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        }
        // $room->roomType()->firstOrCreate($request->all());
        if ($request->input("id")) {
            $roomType = RoomType::find($request->input('id'));
            if (!$roomType) {
                return response()->json([
                    "status" => 404,
                    "message" => "No room type found"
                ], 404);
            }
        } else {
            $roomType = RoomType::firstOrCreate($request->all());
        }
        $room->roomType()->associate($roomType);
        $room->save();
        return response()->json([
            "status" => 200,
            "body" => $room->roomType()->get()
        ], 200);
    }

    public function removeRoomType($id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        }
        $room->roomType()->dissociate();
        $room->save();
        return response()->json([
            "status" => 200,
            "body" => "Operation successful"
        ], 200);
    }
}
