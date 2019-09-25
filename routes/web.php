<?php

use App\Mail\BookingCreated;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix'=> 'admin', 'middleware'=> 'role:ADMIN'],function(){
    Route::get('/test', function () {
        return view('welcome');
    });
    Route::get('/', function () {
        return view('welcome');
    });
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/mail', function () {
    // $invoice = App\Invoice::find(1);

    return new App\Mail\BookingCreated();
});
