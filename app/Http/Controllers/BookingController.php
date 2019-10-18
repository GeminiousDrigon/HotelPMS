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
use App\Mail\BookingCreated;
use Illuminate\Support\Facades\Mail;

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
            $bookings = Booking::whereIn('status', [$request->query('status')])
                ->with(['user', 'rooms', 'billings'])
                ->get();
        } else {
            $bookings = Booking::with(['user', 'rooms', 'billings'])->get();
        }
        return response()->json($bookings, 200);
    }

    public function getOne($id, Request $request)
    {
        if ($request->query('type') === 'detail') {
            $booking = Booking::find($id);
        } else {

            $booking = Booking::with([
                'user',
                'rooms' => function ($query) {
                    $query->with([
                        'roomType',
                        'room',
                        'guests' => function ($query) {
                            $query->orderBy('created_at');
                        }
                    ]);
                },
                'billings'
            ])->find($id);
        }
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
                'status' => $request->status,
                'checkin_date' => $request->checkin_date,
                'checkout_date' => $request->checkout_date,
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
        // return response()->json($request->input('rooms'));
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $rooms = array();
        foreach ($request->input('rooms') as $room) {
            $rooms[] = new BookRoom([
                'room_type_id' => $room['room_type_id'],
                'room_id' => $room['room_id'],
                'price' => $room['price'],
                'with_breakfast' => $room['with_breakfast'],
                'guest_no' => $room['guest_no'],
                'booking_id' => $room['booking_id'],
                // 'color' => $room['id']
            ]);
        }

        $booking->rooms()->saveMany($rooms);
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
        $rooms = $booking->rooms()->with(['room', 'roomType', 'guests'])->get();
        if (!$rooms) {
            return response()->json([
                "status" => 404,
                "message" => "No room found"
            ], 404);
        }
        return response()->json($rooms, 200);
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
            ->whereHas('booking', function ($query) use ($from_date, $to_date) {
                $query->where(function ($query) use ($from_date, $to_date) {
                    $query->whereBetween('from_date', [$from_date, $to_date])
                        ->orWhereBetween('to_date', [$from_date, $to_date]);
                })->where('status', "!=", 'CHECKOUT');
            })
            // ->get();
            ->count();

        // return response()->json($bookings);
        // return response()->json($bookings);
        if ($bookings <= 0) {
            //no bookings on those dates.. proceed
            //get the default rate of the room
            //create the booking
            //and add billing

            $room = Room::with(['roomType'])->find($room_id);
            $rate = Rate::find($rate_id);
            // return response()->json($request->country);

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
            // return response()->json($room->room_type_id);

            $booking = Booking::create([
                'from_date' => $from_date,
                'to_date' => $to_date,
                'user_id' => $user->id,
                'status' => "RESERVED",
                'checkin_date' => null,
                'checkout_date' => null
            ]);

            BookRoom::create([
                'booking_id' => $booking->id,
                'room_type_id' => $room->room_type_id,
                'room_id' => $room->id,
                'price' => $rate->price * $nights,
                'with_breakfast' => $rate->breakfast,
                'guest_no' => $request->input('guest_no'),
            ]);

            if ($request->input('paidAmount')) {
                $billing = Billing::create([
                    'amount' => $request->input('paidAmount'),
                    'booking_id' => $booking->id
                ]);
            }

            $to_name = $user->firstname;
            $to_email = $user->email;
            $data = array("name" => 'Ogbonna', "body" => 'A test mail');
            // return response()->json($user);
            Mail::to($user)->send(new BookingCreated($user, $booking));
            // Mail::send('emails.home', [], function ($message) use ($to_name, $to_email) {
            //     $message->to($to_email, $to_name)
            //         ->subject('Artisans Web Testing Mail');
            //     $message->from('bluepoolgarden2@gmail.com', 'Artisans Web');
            // });

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


        $selectedRooms = array_reduce($request->input('selectedRooms'), function ($output, $item) {
            // $output[$item['id']] = $item['id'];
            if (array_key_exists($item['id'], $output)) {
                $output[$item['id']]['selectedRooms'][] = [
                    "roomTypeId" => $item['id'],
                    "rateId" => $item['rate']['id'],
                    "guest_no" => $item['rate']['adult'],
                    "price" => $item['rate']['price'],
                    "breakfast" => $item['rate']['breakfast'],
                    "roomId" => ""
                ];
            } else {
                $output[$item['id']] = [
                    "id" => $item['id'],
                    "selectedRooms" => [[
                        "roomTypeId" => $item['id'],
                        "rateId" => $item['rate']['id'],
                        "guest_no" => $item['rate']['adult'],
                        "price" => $item['rate']['price'],
                        "breakfast" => $item['rate']['breakfast'],
                        "roomId" => ""
                    ]]
                ];
            }
            return $output;
            // if (!$roomType) {
            //     return $output[$item['id']] = [
            //         "id" => [$item['id']]
            //     ];
            // } else {
            //     return $output;
            // }
        }, array());

        $finalRooms = array();
        foreach ($selectedRooms as $room) {
            $roomType = RoomType::with([
                'rooms' => function ($query) use ($from, $to) {
                    $query->with([
                        'bookings' => function ($query) use ($from, $to) {
                            $query->whereHas('booking', function ($query) use ($from, $to) {
                                $query->whereBetween('from_date', [$from, $to])
                                    ->orWhereBetween('to_date', [$from, $to])
                                    ->whereIn('status', ["CHECKEDIN", "RESERVED"]);
                            });
                        }
                    ])->orderBy('room_number');
                },
                'rates'
            ])->find($room['id']);
            $newRooms = array(); // bakante nga rooms
            for ($i = 0; $i < count($roomType->rooms); $i++) {
                if (!(count($roomType->rooms[$i]->bookings) > 0))
                    $newRooms[] = $roomType->rooms[$i];
            };

            if (count($newRooms) >= count($room['selectedRooms'])) {
                $selectedRooms[$room['id']]['bookable'] = true;
            } else {
                $selectedRooms[$room['id']]['bookable'] = false;
            }
            $selectedRooms[$room['id']]['availableRooms'] = $newRooms;
            for ($i = 0; $i < count($selectedRooms[$room['id']]['selectedRooms']); $i++) {
                $selectedRooms[$room['id']]['selectedRooms'][$i]['roomId'] = $newRooms[$i]['id'];
                $finalRooms[] = $selectedRooms[$room['id']]['selectedRooms'][$i];
            }
        }


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
            'checkout_date' => null,
            'status' => "RESERVED"
        ]);
        foreach ($finalRooms as $selectedRoom) {
            //create one booking
            BookRoom::create([
                'booking_id' => $booking->id,
                'room_type_id' => $selectedRoom["roomTypeId"],
                'room_id' => $selectedRoom["roomId"],
                'price' => $selectedRoom["price"] * $nights,
                'with_breakfast' => $selectedRoom["breakfast"],
                'guest_no' => $selectedRoom["guest_no"],
            ]);
        }

        Mail::to($user)->send(new BookingCreated($user,$booking));

        return response()->json($selectedRooms, 200);

        // return response()->json($finalRooms);

    }

    public function changeDate($id, Request $request)
    {
        // $booking = Booking::find($id);
        // return response()->json($booking);
        $from_date = $request->input('checkin');
        $to_date = $request->input('checkout');
        $from = Carbon::parse($from_date);
        $to = Carbon::parse($to_date);
        $booking = Booking::with([
            'user',
            'rooms' => function ($query) {
                $query->with([
                    // 'roomType',
                    // 'room',
                    // 'guests' => function ($query) {
                    //     $query->orderBy('created_at');
                    // }
                ]);
            },
        ])->find($id);
        $rooms = $booking->rooms;
        foreach ($rooms as $room) {
            $allBooking = Room::with([
                'bookings' => function ($query) use ($from, $to) {
                    // $query->whereHas('bookings', function ($query) use ($from, $to) {
                    $query->whereHas('booking', function ($query) use ($from, $to) {
                        $query->where(function ($query) use ($from, $to) {
                            $query->whereBetween('from_date', [$from, $to])
                                ->orWhereBetween('to_date', [$from, $to]);
                        })->where('status', "!=", 'CHECKOUT');
                    });
                    // });
                }
            ])->find($room->room_id);

            if ($allBooking->bookings->count() > 0) {
                //error
                return response()->json([
                    "code" => "RoomException"
                ], 404);
            }
        }

        //update
        $getBooking = Booking::find($id);
        $getBooking->from_date = $request->input('checkin');
        $getBooking->to_date = $request->input('checkout');
        $getBooking->save();

        return response()->json($getBooking);
    }
}
