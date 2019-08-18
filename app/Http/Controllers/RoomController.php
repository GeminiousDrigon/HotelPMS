<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Room;

class RoomController extends Controller
{
    public function create(Request $request)
    {
        $room = Room::create($request->all());
        return response()->json($room);
    }

    public function getAll()
    {
        $rooms = Room::all();
        return response()->json($rooms);
    }

    public function getOne($id)
    {
        $room = Room::find($id);
        if(!$room){
            return response()->json([
                "status" => 200,
                "message" => "No room found"
            ]);
        }else{
            return response()->json($room);
        }
        
    }

    public function editOne(Request $request, $id)
    {
        $room = Room::find($id);
        if(!$room){
            return response()->json([
                "status" => 200,
                "message" => "No room found"
            ]);
        }else{
            $room->fill([
                'private_bath' => $request->private_bath,
                'free_parking' => $request->free_parking,
                'room_size' => $request->room_size,
                'room_size_unit' => $request->room_size_unit,
                'description' => $request->description,
                'price' => $request->price,
                'non_refundable' => $request->non_refundable,
                'quantity' => $request->quantity,
                'type' => $request->type,
                'max_guest' => $request->max_guest,
                'max_add_guest' => $request->max_add_guest,
            ]);
            $room->save();
            return response()->json($room);
        }
    }

    public function deleteOne($id)
    {
        $room = Room::find($id);
        if(!$room){
            return response()->json([
                "status" => 200,
                "message" => "No room found"
            ]);
        }else{
            Room::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ]);
        }
    }
}
