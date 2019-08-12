<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public function amenities(){
        return $this->belongsToMany('App\Amenity');
    }

    public function bookings(){
        return $this->hasMany('App\Booking');
    }
}
