<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class AmenityRoomType extends Model
{
    use Uuid;

    protected $fillable = [
        'room_type_id',
        'amenity_id'
    ];
}
