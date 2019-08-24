<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Amenity;

class AmenityController extends Controller
{
    public function create(Request $request)
    {
        $amenity = Amenity::create($request->all());
        return response()->json($amenity);
    }

    public function getAll()
    {
        $amenities = Amenity::all();
        return response()->json($amenities);
    }

    public function getOne($id)
    {
        $amenity = Amenity::find($id);
        if(!$amenity){
            return response()->json([
                "status" => 200,
                "message" => "No amenity found"
            ]);
        }else{
            return response()->json($amenity);
        }
        
    }

    public function editOne(Request $request, $id)
    {
        $amenity = Amenity::find($id);
        if(!$amenity){
            return response()->json([
                "status" => 200,
                "message" => "No amenity found"
            ]);
        }else{
            $amenity->fill([
                'name' => $request->name,
                'icon' => $request->icon,
            ]);
            $amenity->save();
            return response()->json($amenity);
        }
    }

    public function deleteOne($id)
    {
        $amenity = Amenity::find($id);
        if(!$amenity){
            return response()->json([
                "status" => 200,
                "message" => "No amenity found"
            ]);
        }else{
            Amenity::destroy($id);
            return response()->json([
                'status' => 200,
                'message' => "You have successfully deleted the item"
            ]);
        }
    }
}
