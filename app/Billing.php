<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    public function booking(){
        return $this->belongsTo('App\Booking','booking_id');
    }
}
