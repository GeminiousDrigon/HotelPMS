<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Billing;

class BillingController extends Controller
{
    public function create(Request $request)
    {
        $billing = Billing::create($request->all());
        return response()->json($billing);
    }

    public function getAll()
    {
        $billings = Billing::all();
        return response()->json($billings);
    }

    public function getOne($id)
    {
        $billing = Billing::find($id);
        if(!$billing){
            return response()->json([
                "status" => 200,
                "message" => "No billing found"
            ]);
        }else{
            return response()->json($billing);
        }
        
    }

    public function editOne(Request $request, $id)
    {
        $billing = Billing::find($id);
        if(!$billing){
            return response()->json([
                "status" => 200,
                "message" => "No billing found"
            ]);
        }else{
            $billing->fill([
                'type' => $request->type,
                'amount' => $request->amount,
                'booking_id' => $request->booking_id,
            ]);
            $billing->save();
            return response()->json($billing);
        }
    }

    public function deleteOne($id)
    {
        $billing = Billing::find($id);
        if(!$billing){
            return response()->json([
                "status" => 200,
                "message" => "No billing found"
            ]);
        }else{
            Billing::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ]);
        }
    }
}
