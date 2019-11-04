<?php

use App\Mail\BookingCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\User;

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

Route::post("/login", "AuthController@login");

Route::get("/roomtype/available", "RoomTypeController@getAvailableRoomsTypes");
Route::post("/booking", "BookingController@createBooking");
Route::post('/user/checkemail', "UserController@checkEmail");
Route::middleware('auth:api')->group(function () {
    Route::get("/user", "AuthController@getUser");
    Route::post("/createAdmin", "AuthController@createAdminAccount");
    Route::post("/register", "AuthController@createGuestUser");

    //users
    Route::get("/user/guests", "UserController@getGuestUsers");
    Route::get("/user/admin", "UserController@getAdminAccounts");
    //amenity-ok
    Route::post("/amenity", "AmenityController@create");
    Route::get("/amenity", "AmenityController@getAll");
    Route::get("/amenity/{id}", "AmenityController@getOne");
    Route::put("/amenity/{id}", "AmenityController@editOne");
    Route::delete("/amenity/{id}", "AmenityController@deleteOne");
    //bookguest-ok
    Route::post("/guest", "RoomGuestController@create");
    Route::get("/guest", "RoomGuestController@getAll");
    Route::get("/guest/{id}", "RoomGuestController@getOne");
    Route::put("/guest/{id}", "RoomGuestController@editOne");
    Route::delete("/guest/{id}", "RoomGuestController@deleteOne");
    //bookroom-ok
    Route::post("/bookroom", "BookRoomController@create");
    Route::get("/bookroom", "BookRoomController@getAll");
    Route::get("/bookroom/{id}", "BookRoomController@getOne");
    Route::put("/bookroom/{id}", "BookRoomController@editOne");
    Route::delete("/bookroom/{id}", "BookRoomController@deleteOne");
    Route::get("/bookroom/{id}/guest", "BookRoomController@getGuest");
    Route::post("/bookroom/{id}/guest", "BookRoomController@addGuest");
    Route::delete("/bookroom/{id}/guest", "BookRoomController@removeGuest");
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
    Route::get("/booking", "BookingController@getAll");
    Route::post("/booking/walkin", "BookingController@createWalkInBooking");
    Route::get("/booking/{id}", "BookingController@getOne");
    Route::put("/booking/{id}", "BookingController@editOne");
    Route::put("/booking/{id}/date", "BookingController@changeDate");
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
    Route::get("/room/available", "RoomController@getAllAvailableRooms");
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
    Route::get("/roomtype/{id}/file", "RoomTypeController@getFiles");
    Route::post("/roomtype/{id}/file", "RoomTypeController@uploadFile");
    Route::delete("/roomtype/{id}/file", "RoomTypeController@deleteFile");
    Route::get("/roomtype/{id}/amenity", "RoomTypeController@getAmenities");
    Route::post("/roomtype/{id}/amenity", "RoomTypeController@addAmenities");
    Route::post("/roomtype/{id}/room", "RoomTypeController@addRoom");
    Route::get("/roomtype/{id}/room", "RoomTypeController@getRooms");
    Route::post("/roomtype/{id}/rate", "RoomTypeController@addRate");
    Route::get("/roomtype/{id}/rate", "RoomTypeController@getRates");
    Route::post("/roomtype/{id}/booking", "RoomTypeController@addBooking");
    Route::get("/roomtype/{id}/booking", "RoomTypeController@getBookings");
    Route::get('/reports', "ReportController@getReports");
    Route::get('/reports/roomtype/{id}', "ReportController@getRoomTypeReport");
    Route::get('/reports/yearly', "ReportController@yearlyReservation");
});



Route::post("/email/test", function (Request $request) {
    $to_name = 'John Bill Suarez';
    $to_email = 'geminiousdrigon@gmail.com';
    $data = array("name" => 'Ogbonna', "body" => 'A test mail');
    $user = User::find("ced8cce6-0571-4c5d-a71d-8078f8de42bd");
    // return response()->json($user);
    Mail::to($user)->send(new BookingCreated($user));
    // Mail::send('emails.home', [], function ($message) use ($to_name, $to_email) {
    //     $message->to($to_email, $to_name)
    //         ->subject('Artisans Web Testing Mail');
    //     $message->from('bluepoolgarden2@gmail.com', 'Artisans Web');
    // });
});

Route::fallback(function () {
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');
