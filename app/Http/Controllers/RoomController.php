<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Room;
use App\RoomType;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class RoomController extends Controller
{
    public function create(Request $request)
    {
        if ($request->input('quantity') == 1) {
            $room = Room::create($request->all());
            return response()->json($room, 200);
        } else {
            $rooms = array();
            $quantity = $request->input('quantity');
            $room_type_id = $request->input('room_type_id');
            $now = Carbon::now();
            for ($i = 0; $i < $quantity; $i++) {
                $rooms[$i] = ["room_type_id" => $room_type_id, "id" => Str::uuid(), 'updated_at' => $now, 'created_at' => $now];
            }
            Room::insert($rooms);
            return response()->json([
                "message" => "Operation successful!"
            ], 200);
        }
    }

    public function getAll()
    {
        $rooms = Room::with('roomType')->orderBy('room_number', 'asc')->get();
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

    public function getAllRooms(Request $request)
    {
        if ($request->query('room_type_id')) {
            $room_type_id = $request->query('room_type_id');
            $room = Room::where('room_type_id', $room_type_id)
                ->whereNotNull('room_number')
                ->orderBy('room_number', 'asc')
                ->get();
        } else {
            $room = Room::where(function ($query) {
                $query->whereNotNull('room_type_id');
            })->orWhere(function ($query) {
                $query->whereNotNull('room_number');
            })->orderBy('room_number', 'asc')
                ->get();
        }

        return response()->json($room, 200);
    }

    public function getAllAvailableRooms(Request $request)
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
            $rooms = Room::with([
                'bookings' => function ($query) use ($from, $to) {
                    $query->whereHas('booking', function ($query) use ($from, $to) {
                        $query->whereBetween('from_date', [$from, $to])
                            ->orWhereBetween('to_date', [$from, $to])
                            ->whereIn('status', ["CHECKEDIN", "RESERVED"]);
                    });
                },
                'roomType'
            ]);
            // return response()->json($rooms);
            if ($request->query('room_type_id')) {
                $rooms = Room::with([
                    'bookings' => function ($query) use ($from, $to) {
                        $query->whereHas('booking', function ($query) use ($from, $to) {
                            $query->whereBetween('from_date', [$from, $to])
                                ->orWhereBetween('to_date', [$from, $to])
                                ->whereIn('status', ["CHECKEDIN", "RESERVED"]);
                        });
                    },
                    'roomType'
                ])->where('room_type_id', $request->query('room_type_id'))->get();
            } else {
                $rooms = Room::with([
                    'bookings' => function ($query) use ($from, $to) {
                        $query->whereHas('booking', function ($query) use ($from, $to) {
                            $query->whereBetween('from_date', [$from, $to])
                                ->orWhereBetween('to_date', [$from, $to])
                                ->whereIn('status', ["CHECKEDIN", "RESERVED"]);
                        });
                    },
                    'roomType'
                ])->get();
            }
            // return response()->json($rooms, 200);

            $finalRoom = array(); //available rooms
            $unbookableRooms = array(); //not available rooms
            foreach ($rooms as $room) {
                if ($room->bookings->count() > 0) {
                    $unbookableRooms[] = $room;

                    unset($room["bookings"]);
                } else {
                    unset($room["bookings"]);
                    $finalRoom[] = $room;
                }
            };

            if (count($rooms) === count($unbookableRooms)) {
                return response()->json([
                    "message" => "FullyBookedRooms"
                ], 404);
            } else
                return response()->json($finalRoom, 200);
        }
    }
}
