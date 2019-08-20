<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class RoomAmenities extends Model
{
    use Uuid;
    //

    protected $fillable = [
        'room_id', 'amenity_id'
    ];

    public $incrementing = false;
}
