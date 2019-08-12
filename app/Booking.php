<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function room(){
        return $this->belongsTo('App\Room', 'room_id');
    }

    public function billings(){
        return $this->hasMany('App\Billing');
    }
}
