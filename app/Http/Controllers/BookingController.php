<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Booking;

class BookingController extends Controller
{
    public function create(Request $request)
    {
        $booking = Booking::create($request->all());
        return response()->json($booking);
    }

    public function getAll()
    {
        $bookings = Booking::all();
        return response()->json($bookings);
    }

    public function getOne($id)
    {
        $booking = Booking::find($id);
        if(!$booking){
            return response()->json([
                "status" => 200,
                "message" => "No booking found"
            ]);
        }else{
            return response()->json($booking);
        }
        
    }

    public function editOne(Request $request, $id)
    {
        $booking = Booking::find($id);
        if(!$booking){
            return response()->json([
                "status" => 200,
                "message" => "No booking found"
            ]);
        }else{
            $booking->fill([
                'from_date' => $request->from_date,
                'to_date' => $request->to_date,
                'user_id' => $request->user_id,
                'room_id' => $request->room_id,
                'price' => $request->price,
                'with_breakfast' => $request->with_breakfast,
            ]);
            $booking->save();
            return response()->json($booking);
        }
    }

    public function deleteOne($id)
    {
        $booking = Booking::find($id);
        if(!$booking){
            return response()->json([
                "status" => 200,
                "message" => "No booking found"
            ]);
        }else{
            Booking::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ]);
        }
    }
}
