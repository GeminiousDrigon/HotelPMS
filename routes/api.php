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
//users
Route::get("/user", "UserController@getGuestUsers");
//amenity-ok
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
Route::get("/billing/{id}/booking", "BillingController@getBooking");
Route::post("/billing/{id}/booking", "BillingController@addBooking");
Route::delete("/billing/{id}/booking", "BillingController@removeBooking");
//booking
Route::post("/booking", "BookingController@create");
Route::get("/booking", "BookingController@getAll");
Route::post("/booking/walkin", "BookingController@createWalkInBooking");
Route::get("/booking/{id}", "BookingController@getOne");
Route::put("/booking/{id}", "BookingController@editOne");
Route::delete("/booking/{id}", "BookingController@deleteOne");
Route::post("/booking/{id}/user", "BookingController@addUser");
Route::get("/booking/{id}/user", "BookingController@getUser");
Route::delete("/booking/{id}/user", "BookingController@removeUser");
Route::post("/booking/{id}/room", "BookingController@addRoom");
Route::get("/booking/{id}/room", "BookingController@getRoom");
Route::delete("/booking/{id}/room", "BookingController@removeRoom");
Route::post("/booking/{id}/roomtype", "BookingController@addRoomType");
Route::get("/booking/{id}/roomtype", "BookingController@getRoomType");
Route::delete("/booking/{id}/roomtype", "BookingController@removeRoomType");
Route::post("/booking/{id}/billing", "BookingController@addBilling");
Route::get("/booking/{id}/billing", "BookingController@getBilling");
Route::delete("/booking/{id}/billing", "BookingController@removeBilling");
//room-ok
Route::post("/room", "RoomController@create");
Route::get("/room", "RoomController@getAll");
Route::get("/room/hotelroom", "RoomController@getAllRooms");
Route::get("/room/{id}", "RoomController@getOne");
Route::put("/room/{id}", "RoomController@editOne");
Route::delete("/room/{id}", "RoomController@deleteOne");
Route::post("/room/{id}/roomtype", "RoomController@addRoomType");
Route::get("/room/{id}/roomtype", "RoomController@getRoomType");
Route::delete("/room/{id}/roomtype", "RoomController@removeRoomType");
//rate-ok
Route::post("/rate", "RateController@create");
Route::get("/rate", "RateController@getAll");
Route::get("/rate/{id}", "RateController@getOne");
Route::put("/rate/{id}", "RateController@editOne");
Route::delete("/rate/{id}", "RateController@deleteOne");
Route::get("/rate/{id}/roomtype", "RateController@getRoomType");
Route::post("/rate/{id}/roomtype", "RateController@addRoomType");
Route::delete("/rate/{id}/roomtype", "RateController@removeRoomType");
//room type-ok
Route::post("/roomtype", "RoomTypeController@create");
Route::get("/roomtype", "RoomTypeController@getAll");
Route::get("/roomtype/{id}", "RoomTypeController@getOne");
Route::put("/roomtype/{id}", "RoomTypeController@editOne");
Route::delete("/roomtype/{id}", "RoomTypeController@deleteOne");
Route::get("/roomtype/{id}/amenity", "RoomTypeController@getAmenities");
Route::post("/roomtype/{id}/amenity", "RoomTypeController@addAmenities");
Route::post("/roomtype/{id}/room", "RoomTypeController@addRoom");
Route::get("/roomtype/{id}/room", "RoomTypeController@getRooms");
Route::post("/roomtype/{id}/rate", "RoomTypeController@addRate");
Route::get("/roomtype/{id}/rate", "RoomTypeController@getRates");
Route::post("/roomtype/{id}/booking", "RoomTypeController@addBooking");
Route::get("/roomtype/{id}/booking", "RoomTypeController@getBookings");


Route::fallback(function(){
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');