<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    public function rooms(){
        return $this->belongsToMany('App\Room');
    }
}
