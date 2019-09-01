<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Room extends Model
{
    use Uuid; 

    protected $fillable = [
        'max_guest', 'max_add_guest', 'room_number', 'room_type_id'
    ];

    public function roomType(){
        return $this->belongsTo('App\RoomType');
    }

    public $incrementing = false;
}
