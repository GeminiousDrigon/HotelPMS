<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Booking;
use App\User;
use App\Room;
use App\RoomType;
use App\Billing;
use App\Rate;
use App\BookRoom;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function create(Request $request)
    {
        $booking = Booking::create($request->all());
        return response()->json($booking);
    }

    public function getAll(Request $request)
    {
        // return response()->json($request->query('status'));
        if ($request->query('status')) {
            $bookings = BookRoom::select('book_rooms.*')->where('status', array($request->query('status')))
                ->leftJoin('bookings', 'bookings.id', '=', 'book_rooms.booking_id')
                ->with(['booking.user', 'roomType', 'room'])
                ->orderBy('from_date', 'asc')->get();
        } else {
            $bookings = BookRoom::with(['booking.user', 'room'])->get();
        }
        return response()->json($bookings, 200);
    }

    public function getOne($id)
    {
        $booking = Booking::with([
            'user',
            'rooms' => function ($query) {
                $query->with(['roomType', 'room']);
            },
            'billings'
        ])->find($id);
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
                'checkin_date' => $request->checkin_date,
                'checkout_date' => $request->checkout_date,
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
        Billing::create([
            'amount' => $request->input('amount'),
            'booking_id' => $id
        ]);
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
        $billing = $booking->billings;
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

    public function createWalkInBooking(Request $request)
    {

        // $user = User::find("bdd7a4ba-39dd-47b2-b33a-2fc0e71dc31c");

        //checkavailability of the room
        //if not available return status 500 with message room is not available please select another room
        //else create the user
        //create the booking
        //add one billing to the booking if paid amount is greater than zero

        // room = "d87959da-9d9a-40d6-8921-df968047b820"
        // date = 2019-09-17 - 2019-09-19 =naa na nga book
        //2019-09-07 - 2019-09-10 = book nako

        // $from_date = $request->input('from_date');
        // $to_date = $request->input('to_date');
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');
        $room_id = $request->input('room_id');
        $rate_id = $request->input('rate_id');

        $from = Carbon::parse($from_date);
        $to = Carbon::parse($to_date);

        $nights = $from->diffInDays($to);

        $bookings = BookRoom::where('room_id', $room_id)
            ->where('status', "!=", 'CHECKOUT')
            ->where(function ($query) use ($from_date, $to_date) {
                $query->whereBetween('from_date', [$from_date, $to_date])
                    ->orWhereBetween('to_date', [$from_date, $to_date]);
            })
            // ->get();
            ->count();
        // return response()->json($bookings);
        if ($bookings <= 0) {
            //no bookings on those dates.. proceed
            //get the default rate of the room
            //create the booking
            //and add billing

            $room = Room::with(['roomType'])->find($room_id);
            $rate = Rate::find($rate_id);

            if (!$request->input('userId')) {
                $user = User::firstOrCreate([
                    'email' => $request->email,
                ], [
                    'email' => $request->email,
                    'password' =>  Hash::make(Str::random(12)),
                    'role' => "USER",
                    'honorific' => $request->honorific,
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'middlename' => $request->middlename,
                    'contactno' => $request->contactno,
                    'address' => $request->address,
                    'country' => $request->country
                ]);
            } else {
                $user = User::find($request->input('userId'));
            }

            //create user

            $booking = Booking::create([
                'from_date' => $from_date,
                'to_date' => $to_date,
                'user_id' => $user->id,
                'room_type_id' => $room->room_type_id,
                'room_id' => $room->id,
                'status' => "RESERVED",
                'guest_no' => $request->input('guest_no'),
                'price' => $rate->price * $nights,
                'with_breakfast' => $rate->breakfast,
                'checkin_date' => null,
                'checkout_date' => null
            ]);

            if ($request->input('paidAmount')) {
                $billing = Billing::create([
                    'amount' => $request->input('paidAmount'),
                    'booking_id' => $booking->id
                ]);
            }

            return response()->json($booking);
        } else {
            //
            return response()->json([
                "message" => "Room is not available in the following dates"
            ], 500);
        }
    }

    public function createBooking(Request $request)
    {

        //check availability of the rooms selected room type
        $from_date = $request->input('checkInDate');
        $to_date = $request->input('checkOutDate');
        $from = Carbon::parse($from_date);
        $to = Carbon::parse($to_date);
        // return response()->json([$from,$to], 200);
        $nights = $from->diffInDays($to);
        $selectedRooms = array();
        $ranOutRooms = array();
        foreach ($request->input('selectedRooms') as $room) {
            // $rooms = Room::with(['bookings'=> function($query){
            //     $query->where('status','RESERVED')
            //     ->where('status','CHECKEDIN');
            // }])->find("b879e577-41ab-400c-adec-1b69856178c9");
            $roomType = RoomType::with([
                'rooms' => function ($query) use ($from, $to) {
                    $query->with([
                        'bookings' => function ($query) use ($from, $to) {
                            $query->whereHas('booking', function ($query) use ($from, $to) {
                                $query->whereBetween('from_date', [$from, $to])
                                    ->orWhereBetween('to_date', [$from, $to]);
                            })->whereIn('status', ["CHECKEDIN", "RESERVED"]);
                        }
                    ]);
                },
                'rates'
            ])->find($room['id']);


            $newRooms = array();
            for ($i = 0; $i < count($roomType->rooms); $i++) {
                if (!(count($roomType->rooms[$i]->bookings) > 0))
                    $newRooms[] = $roomType->rooms[$i];
            };
            $roomType["availableRooms"] = $roomType->rooms()->count();
            if (!count($newRooms) > 0) {
                $lastBooking = RoomType::find($roomType->id)->bookings()->latest()->get();
                $roomType["lastBooking"] = $lastBooking[0]->created_at;
                $roomType["unbookable"] = true;
            }

            if ($roomType["unbookable"]) {
                unset($roomType["rooms"]);
                $ranOutRooms[] = $roomType;
            } else {

                $selectedRooms[] = [
                    "roomTypeId" => $room['id'],
                    "rateId" => $room["rate"]["id"],
                    "guest_no" => $room["rate"]["adult"],
                    "price" => $room["rate"]["price"],
                    "breakfast" => $room["rate"]["breakfast"],
                    "roomId" => $roomType->rooms[0]->id,
                ];
            }
        };

        if (count($ranOutRooms) > 0) {
            //return error here that some of the rooms are not available
            //return the seelected rooms and the rooms that ran out;
            return response()->json([
                "message" => "SelectedRoomsUnavailable",
                "body" => [
                    "ranOutRooms" => $ranOutRooms,
                    "selectedRooms" => $request->input('selectedRooms'),
                ]
            ], 500);
        } else {
            //create a user
            //honorific, fistname, lastname, middlename, address, contactno, contactno, email
            $userDetails = [
                'email' => $request->email,
                'role' => $request->newAccount ? "USER" : "GUEST",
                'honorific' => $request->honorific,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'middlename' => $request->middlename,
                'contactno' => $request->contactno,
                'address' => $request->address,
                'country' => $request->country
            ];
            $userDetails['password'] = Hash::make(Str::random(12));
            $user = User::firstOrCreate([
                'email' => $request->email,
            ], $userDetails);
            //create the bookings;
            //from_date, to_date, status, user_id, room_type_id, room_id, price, with_breakfast

            $booking = Booking::create([
                'from_date' => $from,
                'to_date' => $to,
                'user_id' => $user->id,
                'checkin_date' => null,
                'checkout_date' => null
            ]);
            foreach ($selectedRooms as $selectedRoom) {
                //create one booking
                BookRoom::create([
                    'booking_id' => $booking->id,
                    'room_type_id' => $selectedRoom["roomTypeId"],
                    'room_id' => $selectedRoom["roomId"],
                    'status' => "RESERVED",
                    'price' => $selectedRoom["price"] * $nights,
                    'with_breakfast' => $selectedRoom["breakfast"],
                    'guest_no' => $selectedRoom["guest_no"],
                ]);
            }

            return response()->json($selectedRooms, 200);
        }
    }
}
