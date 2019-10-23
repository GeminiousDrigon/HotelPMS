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
}
