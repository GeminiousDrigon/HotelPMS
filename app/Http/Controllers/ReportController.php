<?php

namespace App\Http\Controllers;

use App\User;
use App\Booking;
use App\Billing;
use App\BookRoom;
use App\RoomType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReportController extends Controller
{
    public function getReports(Request $request)
    {
        $now = Carbon::now();
        $today = Carbon::today()->addDays(1);
        $thisMonth = Carbon::now()->month;
        $thisYear = Carbon::now()->year;
        $daysThisMonth = $now->daysInMonth;



        $dailyReservation = Booking::whereDay('from_date', $today)->count();
        $monthlyReservation = Booking::whereMonth('from_date', $thisMonth)->count();
        $monthlyIncome = BookRoom::whereHas('booking', function ($query) use ($thisMonth) {
            $query->whereMonth('from_date', $thisMonth)->where('status', 'CHECKEDOUT');
        })->sum('price');
        $yearlyIncome = BookRoom::whereHas('booking', function ($query) use ($thisYear) {
            $query->whereYear('from_date', $thisYear)->where('status', 'CHECKEDOUT');
        })->sum('price');

        $yearlyAdditionals = 0;
        $yearRooms = BookRoom::whereHas('booking', function ($query) use ($thisYear) {
            $query->whereYear('from_date', $thisYear)->where('status', 'CHECKEDOUT');
        })->get();

        foreach ($yearRooms as $yearRoom) {
            if ($yearRoom->additional_beds > 0) {
                $yearlyAdditionals += ($yearRoom->additional_beds * 100);
            }
        }

        $monthlyAdditionals = 0;
        $monthRooms =  BookRoom::whereHas('booking', function ($query) use ($thisMonth) {
            $query->whereMonth('from_date', $thisMonth)->where('status', 'CHECKEDOUT');
        })->get();

        foreach ($monthRooms as $monthRoom) {
            if ($monthRoom->additional_beds > 0) {
                $monthlyAdditionals += ($monthRoom->additional_beds * 100);
            }
        }

        $yearlyIncome = $yearlyIncome + $yearlyAdditionals;
        $monthlyIncome = $monthlyIncome + $monthlyAdditionals;

        $daysInMonth = array();
        for ($i = 1; $i <= $daysThisMonth; $i++) {
            $daysInMonth[] = $i;
        }
        $bookingMonth = array();
        for ($i = 1; $i <= $daysThisMonth; $i++) {
            $date = Carbon::now();
            $date->day = $i;
            $bookingMonth[] = Booking::whereDay('from_date', $date)->count();
        }

        $roomTypesArray = RoomType::select(['name', 'id'])->orderBy('name')->get();
        $roomTypes = RoomType::select(['id'])->get();

        $monthlyRoomtype = array();
        for ($i = 1; $i <= $daysThisMonth; $i++) {
            $date = Carbon::now();
            $date->day = $i;
            // $booking = BookRoom::whereHas('booking', function ($query) use ($date) {
            //     $query->whereDay('from_date', $date)->where('status', 'RESERVED');
            // })->where('room_type_id', $roomTypes[0]->id)->get();
            $booking = Booking::whereHas('rooms', function ($query) use ($date, $roomTypes) {
                $query->whereDay('from_date', $date)
                    ->where('room_type_id', $roomTypes[0]->id);
            })->count();
            $monthlyRoomtype[] = $booking;
            // return response()->json($booking);
        }

        // return response()->json($roomTypesArray);

        return response()->json([
            "dailyBookings" => $dailyReservation,
            "monthlyBookings" => $monthlyReservation,
            "monthlyIncome" => number_format((float) $monthlyIncome, 2, '.', ''),
            "yearlyIncome" => number_format((float) $yearlyIncome, 2, '.', ''),
            "daysInMonth" => $daysInMonth,
            "bookingMonth" => $bookingMonth,
            "monthlyRoomtype" => $monthlyRoomtype,
            "roomTypes" => $roomTypesArray
        ]);
    }

    public function getRoomTypeReport($id, Request $request)
    {
        $daysThisMonth = Carbon::now()->daysInMonth;
        $roomTypesArray = RoomType::select(['name', 'id'])->orderBy('name')->get();
        $roomTypes = RoomType::select(['id'])->get();

        $monthlyRoomtype = array();
        for ($i = 1; $i <= $daysThisMonth; $i++) {
            $date = Carbon::now();
            $date->day = $i;
            // $booking = BookRoom::whereHas('booking', function ($query) use ($date) {
            //     $query->whereDay('from_date', $date)->where('status', 'RESERVED');
            // })->where('room_type_id', $roomTypes[0]->id)->get();
            $booking = Booking::whereHas('rooms', function ($query) use ($date, $id) {
                $query->whereDay('from_date', $date)->where('status', 'RESERVED')
                    ->where('room_type_id', $id);
            })->count();
            $monthlyRoomtype[] = $booking;
            // return response()->json($booking);
        }
        return response()->json($monthlyRoomtype);
    }

    public function yearlyReservation(Request $request)
    {
        if ($request->query('month')) {
            $month = $request->query('month');
            $monthName = Carbon::now()->month($month)->format('F');
            $year = Carbon::now()->year;
            $rooms =  BookRoom::whereHas('booking', function ($query) use ($year, $month) {
                $query->whereYear('from_date', $year)->whereMonth('from_date', $month);
            })->with(['booking.user', 'room', 'roomType'])->get();
            if (count($rooms) === 0) {
                return response()->json([
                    'message' => 'NotFound'
                ], 404);
            } else {
                return response()->json(array([
                    'name' => $monthName,
                    'data' => $rooms
                ]));
            }
        } else {
            $year = Carbon::now()->year;
            $months = array(
                [
                    'name' => "January",
                ],
                [
                    'name' => "February",
                ],
                [
                    'name' => "March",
                ],
                [
                    'name' => "April",
                ],
                [
                    'name' => "May",
                ],
                [
                    'name' => "June",
                ],
                [
                    'name' => "July",
                ],
                [
                    'name' => "August",
                ],
                [
                    'name' => "September",
                ],
                [
                    'name' => "October",
                ],
                [
                    'name' => "November",
                ],
                [
                    'name' => "December",
                ],
            );

            $empty = true;
            for ($i = 0; $i < count($months); $i++) {
                $rooms =  BookRoom::whereHas('booking', function ($query) use ($year, $i) {
                    $query->whereYear('from_date', $year)->whereMonth('from_date', $i + 1);
                })->with(['booking.user', 'room', 'roomType'])->get();
                $months[$i]['data'] = $rooms;
                if (count($rooms) > 0) {
                    $empty = false;
                }
            }

            if ($empty) {
                return response()->json([], 404);
            } else
                return response()->json($months);
        }
    }
}
