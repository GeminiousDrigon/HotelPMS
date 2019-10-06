<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BookRoom;

class BookRoomController extends Controller
{
    public function create(Request $request)
    {
        $bookRoom = BookRoom::create($request->all());
        return response()->json($bookRoom, 200);
    }

    public function getAll(Request $request)
    {
        if ($request->query('status')) {
            $bookRooms = BookRoom::whereHas('booking', function ($query) use ($request) {
                $query->whereIn('status', [$request->query('status')]);
            })->with(['booking.user', 'room'])->get();
        } else {
            $bookRooms = BookRoom::with(['booking.user', 'room'])->get();
        }
        return response()->json($bookRooms, 200);
    }

    public function getOne($id)
    {
        $bookRoom = BookRoom::find($id);
        if (!$bookRoom) {
            return response()->json([
                "status" => 404,
                "message" => "No bookRoom found"
            ], 404);
        } else {
            return response()->json($bookRoom, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $bookRoom = BookRoom::find($id);
        if (!$bookRoom) {
            return response()->json([
                "status" => 404,
                "message" => "No bookRoom found"
            ], 404);
        } else {
            $bookRoom->fill([
                'room_type_id' => $request->room_type_id,
                'room_id' => $request->room_id,
                'price' => $request->price,
                'with_breakfast' => $request->with_breakfast,
                'guest_no' => $request->guest_no,
                'booking_id' => $request->booking_id,
                'color' => $request->color,
            ]);
            $bookRoom->save();
            return response()->json($bookRoom, 200);
        }
    }

    public function deleteOne($id)
    {
        $bookRoom = BookRoom::find($id);
        if (!$bookRoom) {
            return response()->json([
                "status" => 404,
                "message" => "No bookRoom found"
            ], 404);
        } else {
            BookRoom::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }
}
