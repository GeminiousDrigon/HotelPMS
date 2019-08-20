<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Room extends Model
{
    use Uuid; 

    protected $fillable = [
        'private_bath', 'free_parking', 'room_size', 'room_size_unit', 'description', 'price', 'non_refundable', 'quantity', 'type', 'max_guest', 'max_add_guest'
    ];

    public function amenities(){
        return $this->belongsToMany('App\Amenity');
    }

    public function bookings(){
        return $this->hasMany('App\Booking');
    }

    public $incrementing = false;
}
