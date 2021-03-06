<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Amenity extends Model
{
    use Uuid;

    protected $fillable = [
        'name', 'icon'
    ];

    public function roomsTypes(){
        return $this->belongsToMany('App\RoomType')->withTimestamps();
    }

    public $incrementing = false;
}
