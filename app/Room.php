<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Room extends Model
{
    use Uuid; 

    protected $fillable = [
        'room_number', 'room_type_id'
    ];

    public function roomType(){
        return $this->belongsTo('App\RoomType');
    }

    public function bookings()
    {
        return $this->hasMany('App\Booking');
    }

    public $incrementing = false;
}
