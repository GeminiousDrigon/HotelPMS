<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Booking;
use App\User;
use App\Room;
use App\RoomType;
use App\Billing;

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
        return response()->json($bookings, 200);
    }

    public function getOne($id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        } else {
            return response()->json($booking, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        } else {
            $booking->fill([
                'from_date' => $request->from_date,
                'to_date' => $request->to_date,
                'user_id' => $request->user_id,
                'room_id' => $request->room_id,
                'price' => $request->price,
                'with_breakfast' => $request->with_breakfast,
            ]);
            $booking->save();
            return response()->json($booking, 200);
        }
    }

    public function deleteOne($id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        } else {
            Booking::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }

    public function addUser($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $user = User::find($request->input('id'));
        if (!$user) {
            return response()->json([
                "status" => 404,
                "message" => "No user found"
            ], 404);
        }
        $booking->user()->associate($user);
        $booking->save();
        return response()->json([
            "status" => 404,
            "message" => "Operation successful"
        ], 404);
    }

    public function getUser($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        return response()->json($booking->user()->get(), 200);
    }

    public function removeUser($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $booking->user()->dissociate();
        $booking->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function addRoom($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $room = Room::find($request->input('id'));
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        }
        $booking->room()->associate($room);
        $booking->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function getRoom($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $room = $booking->room;
        if (!$room) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        }
        return response()->json($booking->room()->get(), 200);
    }

    public function removeRoom($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $booking->room()->dissociate();
        $booking->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function addRoomType($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $roomType = RoomType::find($request->input('id'));
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No room type found"
            ], 404);
        }
        $booking->roomType()->associate($roomType);
        $booking->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function getRoomType($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $roomType = $booking->roomType;
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
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $booking->roomType()->dissociate();
        $booking->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function addBilling($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $billing = Billing::find($request->input('id'));
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        }
        $booking->booking()->save($billing);
        $booking->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function getBilling($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $billing = $booking->billing;
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        }
        return response()->json($booking, 200);
    }

    public function removeBilling($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $billing = Billing::find($request->input('id'));
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        }
        $billing->booking()->detach($billing);
        $billing->save();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }
}
