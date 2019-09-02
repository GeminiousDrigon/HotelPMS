<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Amenity;

class AmenityController extends Controller
{
    public function create(Request $request)
    {
        $amenity = Amenity::create($request->all());
        return response()->json($amenity, 200);
    }

    public function getAll()
    {
        $amenities = Amenity::all();
        return response()->json($amenities, 200);
    }

    public function getOne($id)
    {
        $amenity = Amenity::find($id);
        if (!$amenity) {
            return response()->json([
                "status" => 404,
                "message" => "No amenity found"
            ], 404);
        } else {
            return response()->json($amenity, 200);
        }
    }

    public function editOne(Request $request, $id)
    {
        $amenity = Amenity::find($id);
        if (!$amenity) {
            return response()->json([
                "status" => 404,
                "message" => "No amenity found"
            ], 404);
        } else {
            $amenity->fill([
                'name' => $request->name,
                'icon' => $request->icon,
            ]);
            $amenity->save();
            return response()->json($amenity, 200);
        }
    }

    public function deleteOne($id)
    {
        $amenity = Amenity::find($id);
        if (!$amenity) {
            return response()->json([
                "status" => 404,
                "message" => "No amenity found"
            ], 404);
        } else {
            Amenity::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ], 200);
        }
    }
}
