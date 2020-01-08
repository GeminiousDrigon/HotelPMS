<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\CreatedPendingBooking;
use App\Booking;
use App\User;
use App\Room;
use App\RoomType;
use App\Billing;
use App\Rate;
use App\BookRoom;
use App\Additional;
use App\AdditionalBooking;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Mail\BookingCreated;
use App\Mail\UserCreated;
use App\Notifications\PaymentAdded;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

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
                'additionals',
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

    public function addAdditional($id, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }

        // $amenities = $roomType->amenities()->sync($amenityIds);
        $additionals = $request->input('id');
        $quantity = $request->input('quantity');
        if (!$additionals) {
            return response()->json([
                "status" => 404,
                "message" => "No room type found"
            ], 404);
        }
        $quantity = $quantity;
        $additional = Additional::find($additionals);

        $booking->additionals()->save($additional, ['price' => $additional->price, 'quantity' => $quantity]);
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function getAdditional($id, Request $request)
    {
        $booking = Booking::with('additionals')->find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $additional = $booking->additionals;
        if (!$additional) {
            return response()->json([
                "status" => 404,
                "message" => "No room type found"
            ], 404);
        }
        return response()->json($additional, 200);
    }

    public function getOneBookingAdditional($id, $additionalId, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $additional = AdditionalBooking::find($additionalId);
        return response()->json($additional, 200);
    }

    public function removeAdditional($id, $additionalId, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $additional = AdditionalBooking::find($additionalId);
        $additional->delete();
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function editAdditional($id, $additionalId, Request $request)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $booking->additionals()->updateExistingPivot($additionalId, ["quantity" => $request->input('quantity')]);
        return response()->json([
            "status" => 200,
            "message" => "Operation successful"
        ], 200);
    }

    public function addRoom($id, Request $request)
    {
        // return response()->json($request->input('rooms'));
        $booking = Booking::find($id);
        $from_date = $booking->from_date;
        $to_date = $booking->to_date;

        $from = Carbon::parse($from_date);
        $to = Carbon::parse($to_date);

        $nights = $from->diffInDays($to);
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
                'price' => $room['price'] * $nights,
                'with_breakfast' => $room['with_breakfast'],
                'guest_no' => $room['guest_no'],
                'booking_id' => $room['booking_id'],
                'rate_id' => $room['rateId']
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
        //get all the rooms and additional price
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }

        Billing::create([
            'amount' => $request->input('amount'),
            'type' => $request->input('type'),
            'booking_id' => $id
        ]);

        $bookingBilling = Booking::with(['billings', 'rooms'])->find($id);
        $totalPayed = $bookingBilling->billings->sum('amount');
        $additionals = $bookingBilling->additionals;
        $totalAdditional = 0;
        foreach ($additionals as $additional) {
            $totalAdditional = $totalAdditional + $additional->pivot->price * $additional->pivot->quantity;
        }
        $totalAmount = $booking->rooms->sum('price') + $totalAdditional;

        if ($totalPayed >= $totalAmount * (0.10) && $booking->status === "PENDING") {
            $newBooking = Booking::with('billings')->find($id);
            foreach ($newBooking->billings as $billing) {
                # code...
                $billing->delete = false;
                $billing->save();
            }
            $booking->status = "RESERVED";
            $booking->save();
        }
        $user = User::find($booking->user_id);
        $user->notify(new PaymentAdded([
            "type" => $request->type,
            "amount" => $request->amount,
            'booking_id' => $booking->id
        ]));
        // return response()->json($bookingBilling->billings->sum('amount'));

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
        if ($billing->delete) {
            $billing->booking()->detach($billing);
            $billing->save();
            return response()->json([
                "status" => 200,
                "message" => "Operation successful"
            ], 200);
        } else {
            return response()->json("Can't delete Billing", 403);
        }
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
                        ->orWhereBetween('to_date', [$from_date, $to_date])
                        ->orWhere(function ($query) use ($from_date, $to_date) {
                            $query->where('from_date', '<=', $from_date);
                            $query->where('to_date', '>=', $to_date);
                        });
                })->whereIn('status', ["CHECKEDIN", "RESERVED"]);
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
            // return response()->json($user);
            if ($user->role->name === 2) {
                return response()->json([
                    'message' => "UserIsAdmin"
                ], 500);
            }

            $booking = Booking::create([
                'from_date' => $from_date,
                'to_date' => $to_date,
                'user_id' => $user->id,
                'status' => "PENDING",
                'checkin_date' => null,
                'checkout_date' => null,
                'arrival' => Carbon::parse($request->arrival)
            ]);

            BookRoom::create([
                'booking_id' => $booking->id,
                'room_type_id' => $room->room_type_id,
                'room_id' => $room->id,
                'price' => $rate->price * $nights,
                'rate_id' => $rate->id,
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

            $admins = User::whereIn('role_id', array(2, 3))->get();
            Notification::send($admins, new CreatedPendingBooking(["booking_id" => "d9eac925-8d6c-492f-9581-4a8ccc94dbdf"]));

            return response()->json($booking);
        } else {
            //
            return response()->json([
                "error" => "RoomNotAvailable",
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
                                $query->whereIn('status', ["CHECKEDIN", "RESERVED"])
                                    ->where(function ($query) use ($from, $to) {
                                        $query->whereBetween('from_date', [$from, $to])
                                            ->orWhereBetween('to_date', [$from, $to])
                                            ->orWhere(function ($query) use ($from, $to) {
                                                $query->where('from_date', '<=', $from);
                                                $query->where('to_date', '>=', $to);
                                            });
                                    });
                            });
                        }
                    ])->orderBy('room_number');
                },
                'rates', 'bookings'
            ])->find($room['id']);
            $newRooms = array(); // bakante nga rooms
            for ($i = 0; $i < count($roomType->rooms); $i++) {
                if (!(count($roomType->rooms[$i]->bookings) > 0)) {
                    $newRooms[] = $roomType->rooms[$i];
                }
            };
            // return respon
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
            'role_id' => 1,
            'honorific' => $request->honorific,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'middlename' => $request->middlename,
            'contactno' => $request->contactno,
            'address' => $request->address,
            'country' => $request->country
        ];
        $password = Str::random(12);

        $userDetails['password'] = Hash::make($password);
        echo $password;
        $user = User::firstOrCreate([
            'email' => $request->email,
            'role_id' => 1
        ], $userDetails);
        Mail::to($user)->send(new UserCreated($user, $password));
        //create the bookings;
        //from_date, to_date, status, user_id, room_type_id, room_id, price, with_breakfast

        $booking = Booking::create([
            'from_date' => $from,
            'to_date' => $to,
            'user_id' => $user->id,
            'checkin_date' => null,
            'checkout_date' => null,
            'status' => "PENDING",
            'arrival' => $request->arrival
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
                'rate_id' => $selectedRoom["rateId"]
            ]);
        }

        //TODO: add the additionals here

        Mail::to($user)->send(new BookingCreated($user, $booking));

        //get all admin and receptionist users
        $admins = User::whereIn('role_id', array(2, 3))->get();
        Notification::send($admins, new CreatedPendingBooking($booking));

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
        $nights = $from->diffInDays($to);
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
                'bookings' => function ($query) use ($from, $to, $id) {
                    // $query->whereHas('bookings', function ($query) use ($from, $to) {
                    $query->whereHas('booking', function ($query) use ($from, $to, $id) {
                        $query->where(function ($query) use ($from, $to) {
                            $query->whereBetween('from_date', [$from, $to])
                                ->orWhereBetween('to_date', [$from, $to]);
                        })->whereIn('status', ['CHECKEDIN', 'RESERVED'])->where('id', '!=', $id);
                    })->with('booking');
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
        // return response()->json(["checkin" => $request->input('checkin'), "checkout" => $request->input('checkout')]);
        $getBooking = Booking::find($id);
        $bookRooms = BookRoom::where('booking_id', $id)->get();
        foreach ($bookRooms as $bookRoom) {
            $rate = Rate::find($bookRoom->rate_id);
            $price = $rate->price * $nights;
            $bookRoom->price = $price;
            $bookRoom->save();
        }
        $getBooking->from_date = $request->input('checkin');
        $getBooking->to_date = $request->input('checkout');
        $getBooking->arrival = $request->input('arrival');
        $getBooking->save();

        return response()->json($getBooking);
    }
}
