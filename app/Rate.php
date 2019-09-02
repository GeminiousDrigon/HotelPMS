<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Rate extends Model
{
    use Uuid;
    protected $fillable = [
        'sleep', 'price', 'breakfast', 'room_type_id'
    ];

    public function roomType(){
        return $this->belongsTo('App\RoomType');
    }

    public $incrementing = false;
}
