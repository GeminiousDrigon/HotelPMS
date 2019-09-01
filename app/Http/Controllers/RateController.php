<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rate;
use App\RoomType;

class RateController extends Controller
{
    public function create(Request $request)
    {
        $rate = Rate::create($request->all());
        return response()->json($rate);
    }

    public function getAll()
    {
        $rates = Rate::all();
        return response()->json($rates);
    }

    public function getOne($id)
    {
        $rate = Rate::with('roomType')->find($id);
        if (!$rate) {
            return response()->json([
                "status" => 200,
                "message" => "No rate found"
            ]);
        } else {
            return response()->json($rate);
        }
    }

    public function editOne(Request $request, $id)
    {
        $rate = Rate::find($id);
        if (!$rate) {
            return response()->json([
                "status" => 200,
                "message" => "No rate found"
            ]);
        } else {
            $rate->fill([
                'sleep' => $request->sleep,
                'price' => $request->price,
                'breakfast' => $request->breakfast,
                'room_type_id' => $request->room_type_id
            ]);
            $rate->save();
            return response()->json($rate);
        }
    }

    public function deleteOne($id)
    {
        $rate = Rate::find($id);
        if (!$rate) {
            return response()->json([
                "status" => 200,
                "message" => "No rate found"
            ]);
        } else {
            Rate::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ]);
        }
    }

    public function addRoomType($id, Request $request)
    {
        $rate = Rate::find($id);
        if (!$rate) {
            return response()->json([
                "status" => 404,
                "message" => "No rate found"
            ], 404);
        }
        $roomType = RoomType::find($request->input("id"));
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No room type found"
            ], 404);
        }
        $rate->roomType()->associate($roomType);
        $rate->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function getRoomType($id, Request $request)
    {
        $rate = Rate::find($id);
        if (!$rate) {
            return response()->json([
                "status" => 404,
                "message" => "No rate found"
            ], 404);
        }
        $roomType = $rate->roomType;
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No room type found"
            ], 404);
        }
        return response()->json($roomType, 200);
    }

    public function removeRoomType($id, Request $request)
    {
        $rate = Rate::find($id);
        if (!$rate) {
            return response()->json([
                "status" => 404,
                "message" => "No rate found"
            ], 404);
        }
        $rate->roomType()->dissociate();
        $rate->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }
}
