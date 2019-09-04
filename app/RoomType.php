<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class RoomType extends Model
{
    use Uuid;
    //

    protected $fillable = [
        'name',
        'room_size',
        'bed_no',
        'bed_type',
        'max_guest',
        'room_size_unit',
        'description',
    ];

    public function amenities()
    {
        return $this->belongsToMany('App\Amenity')->withTimestamps();
    }

    public function rooms()
    {
        return $this->hasMany('App\Room');
    }

    public function rates()
    {
        return $this->hasMany('App\Rate');
    }

    public function bookings()
    {
        return $this->hasMany('App\Booking');
    }

    public $incrementing = false;
}
