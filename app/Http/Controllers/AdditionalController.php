<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Additional;

class AdditionalController extends Controller
{
    //
    public function create(Request $request)
    {
        $additional = Additional::create($request->all());
        return response()->json($additional, 200);
    }

    public function getAll()
    {
        $additionals = Additional::where('delete', 0)->get();
        return response()->json($additionals, 200);
    }

    public function getOne($id)
    {
        $additional = Additional::where('delete', 0)->find($id);
        if (!$additional) {
            return response()->json([
                "status" => 404,
                "message" => "No additional found"
            ], 404);
        } else {
            return response()->json($additional, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $additional = Additional::find($id);
        if (!$additional) {
            return response()->json([
                "status" => 404,
                "message" => "No additional found"
            ], 404);
        } else {
            $additional->fill([
                'name' => $request->name,
                'icon' => $request->icon
            ]);
            $additional->save();
            return response()->json($additional, 200);
        }
    }

    public function deleteOne($id)
    {
        $additional = Additional::find($id);
        if (!$additional) {
            return response()->json([
                "status" => 404,
                "message" => "No additional found"
            ], 404);
        } else {
            $additional->delete = true;
            $additional->save();
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }
}
