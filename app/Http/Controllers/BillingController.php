<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Billing;
use App\Booking;
use App\Notifications\PaymentAdded;
use App\User;
use Illuminate\Support\Facades\Storage;

class BillingController extends Controller
{
    public function create(Request $request)
    {
        $billing = Billing::create($request->all());
        return response()->json($billing, 200);
    }

    public function getAll()
    {
        $billings = Billing::all();
        return response()->json($billings, 200);
    }

    public function getOne($id)
    {
        $billing = Billing::find($id);
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        } else {
            return response()->json($billing, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $billing = Billing::find($id);
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        } else {
            $billing->fill([
                'amount' => $request->amount,
                'booking_id' => $request->booking_id,
                'type' => $request->type,
                'other' => $request->other
            ]);
            $billing->save();
            return response()->json($billing, 200);
        }
    }

    public function deleteOne($id)
    {
        $billing = Billing::find($id);
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        } else {
            Billing::destroy($id);

            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }

    public function getBooking($id)
    {
        $billing = Billing::find($id);
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        }
        $booking = $billing->booking;
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        return response()->json($booking, 200);
    }

    public function addBooking(Request $request, $id)
    {
        $billing = Billing::find($id);
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        }
        $files = Storage::files("/public/billing/" . $id);
        Storage::delete($files);
        $booking = Booking::find($request->id);
        if (!$booking) {
            return response()->json([
                "status" => 404,
                "message" => "No booking found"
            ], 404);
        }
        $billing->booking()->associate($booking);
        $billing->save();
        return response()->json($billing->booking()->get());
    }

    public function removeBooking($id, Request $request)
    {
        $billing = Billing::find($id);
        if (!$billing) {
            return response()->json([
                "status" => 404,
                "message" => "No billing found"
            ], 404);
        }
        $billing->booking()->dissociate();
        $billing->save();
        return response()->json([
            "message" => "Operation success!"
        ])->status(200);
    }

    public function getFiles($id, Request $request)
    {
        $files = Storage::files("/public/billing/" . $id);
        $files = array_map(function ($file) {
            return  [
                "src" => Storage::url($file),
                "filename" => basename($file)
            ];
        }, $files);
        return response()->json($files);
    }

    public function uploadFile($id, Request $request)
    {
        $file = $request->file('image');
        // return response()->json($files);
        $file->store('public/billing/' . $id);
        return response()->json($request->all());
    }

    public function deleteFile($id, Request $request)
    {
        $path = 'public/billing/' . $id . "/" . $request->query('filename');
        Storage::delete($path);
        return response()->json(200);
    }
}
