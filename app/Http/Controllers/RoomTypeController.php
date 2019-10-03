<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RoomType;
use App\Room;
use App\Rate;
use App\Amenity;
use App\Booking;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class RoomTypeController extends Controller
{
    public function create(Request $request)
    {
        $roomType = RoomType::create($request->all());
        return response()->json($roomType, 200);
    }

    public function getAll()
    {
        $roomTypes = RoomType::with(['amenities:icon,name', 'rates'])->get();
        return response()->json($roomTypes, 200);
    }

    public function getOne($id)
    {
        $roomType = RoomType::with(['amenities', 'rooms' => function ($query) {
            $query->whereNotNull('room_number')->with('roomType');
        }, 'rates', 'bookings'])->find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        } else {
            return response()->json($roomType, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        } else {
            $roomType->fill([
                'name' => $request->name,
                'description' => $request->description,
                'room_size' => $request->room_size,
                'room_size_unit' => $request->room_size_unit,
                'max_guest' => $request->max_guest,
                'bed_no' => $request->bed_no,
                'bed_type' => $request->bed_type
            ]);
            $roomType->save();
            return response()->json($roomType, 200);
        }
    }

    public function deleteOne($id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        } else {
            RoomType::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }

    public function getAmenities($id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }
        $amenities = $roomType->amenities()->get();
        return response()->json($amenities, 200);
    }

    public function addAmenities($id, Request $request)
    {
        $amenityIds = $request->id;
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }
        $amenities = $roomType->amenities()->sync($amenityIds);
        return response()->json($roomType->amenities()->get(), 200);
    }

    public function addRoom(Request $request, $id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }
        if ($request->input("id")) {
            $room = Room::find($request->input('id'));
            if (!$room) {
                return response()->json([
                    "status" => 404,
                    "message" => "No room found"
                ], 404);
            }
        } else {
            $room = Room::firstOrCreate($request->all());
        }

        $roomType->rooms()->save($room);
        return response()->json([
            "message" => "Operaion successful!"
        ], 200);
    }

    public function getRooms($id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }
        $rooms = $roomType->rooms;
        return response()->json($rooms, 200);
    }

    public function addRate(Request $request, $id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }

        if ($request->input("id")) {
            $rate = Rate::find($request->input("id"));
            if (!$rate) {
                return response()->json([
                    "status" => 404,
                    "message" => "No rate found"
                ], 404);
            }
        } else {
            $rate = Rate::firstOrCreate($request->all());
        }
        $roomType->rates()->save($rate);
        return response()->json([
            "message" => "Operaion successful!"
        ], 200);
    }

    public function getRates($id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }
        $rates = $roomType->rates;
        return response()->json($rates, 200);
    }

    public function addBooking(Request $request, $id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }

        if ($request->input("id")) {
            $booking = Booking::find($request->input("id"));
            if (!$booking) {
                return response()->json([
                    "status" => 404,
                    "message" => "No booking found"
                ], 404);
            }
        } else {
            $booking = Booking::firstOrCreate($request->all());
        }
        $roomType->booking()->save($booking);
        return response()->json([
            "message" => "Operation successful!"
        ], 200);
    }

    public function getBookings($id)
    {
        $roomType = RoomType::find($id);
        if (!$roomType) {
            return response()->json([
                "status" => 404,
                "message" => "No roomType found"
            ], 404);
        }
        $bookings = $roomType->bookings;
        return response()->json($bookings, 200);
    }

    public function getAvailableRoomsTypes(Request $request)
    {
        if (!$request->query('checkin') || !$request->query('checkout')) {
            return response()->json([
                "message" => "check-in and check-out dates are required"
            ], 400);
        } else {
            $from_date = $request->query('checkin');
            $to_date = $request->query('checkout');
            $from = Carbon::parse($from_date);
            $to = Carbon::parse($to_date);
            $roomTypes = RoomType::with([
                'rooms' => function ($query) use ($from, $to) {
                    $query->with([
                        'bookings' => function ($query) use ($from, $to) {
                            $query->whereHas('booking', function ($query) use ($from, $to) {
                                $query->whereBetween('from_date', [$from, $to])
                                    ->orWhereBetween('to_date', [$from, $to])
                                    ->whereIn('status', ["CHECKEDIN", "RESERVED"]);
                            });
                        }
                    ]);
                },
                'rates', 'amenities'
            ])->get();
            // return response()->json($roomTypes);

            $finalRoomType = array();
            $unbookableRooms = array();
            foreach ($roomTypes as $roomType) {
                $newRooms = array();
                for ($i = 0; $i < count($roomType->rooms); $i++) {
                    if (!(count($roomType->rooms[$i]->bookings) > 0))
                        $newRooms[] = $roomType->rooms[$i];
                };
                $roomType["availableRooms"] = $roomType->rooms()->count();
                unset($roomType["rooms"]);
                if (!count($newRooms) == 0) {
                    // $roomType['rooms'] = $newRooms;
                    $finalRoomType[] = $roomType;
                } else {
                    $lastBooking = RoomType::find($roomType->id)->bookings()->latest()->get();
                    $roomType["lastBooking"] = $lastBooking[0]->created_at;
                    $roomType["unbookable"] = true;
                    $finalRoomType[] = $roomType;
                    $unbookableRooms[] = $roomType;
                }
            };

            if (count($finalRoomType) === count($unbookableRooms)) {
                return response()->json([
                    "message" => "FullyBookedRooms"
                ], 404);
            } else
                return response()->json($finalRoomType, 200);
        }
    }
}
