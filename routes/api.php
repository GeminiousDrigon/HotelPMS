<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//amenity
Route::post("/amenity", "AmenityController@create");
Route::get("/amenity", "AmenityController@getAll");
Route::get("/amenity/{id}", "AmenityController@getOne");
Route::put("/amenity/{id}", "AmenityController@editOne");
Route::delete("/amenity/{id}", "AmenityController@deleteOne");
//billing
Route::post("/billing", "BillingController@create");
Route::get("/billing", "BillingController@getAll");
Route::get("/billing/{id}", "BillingController@getOne");
Route::put("/billing/{id}", "BillingController@editOne");
Route::delete("/billing/{id}", "BillingController@deleteOne");
//booking
Route::post("/booking", "BookingController@create");
Route::get("/booking", "BookingController@getAll");
Route::get("/booking/{id}", "BookingController@getOne");
Route::put("/booking/{id}", "BookingController@editOne");
Route::delete("/booking/{id}", "BookingController@deleteOne");
//room
Route::post("/room", "RoomController@create");
Route::get("/room", "RoomController@getAll");
Route::get("/room/{id}", "RoomController@getOne");
Route::put("/room/{id}", "RoomController@editOne");
Route::delete("/room/{id}", "RoomController@deleteOne");


Route::fallback(function(){
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');