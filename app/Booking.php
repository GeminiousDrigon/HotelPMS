<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Booking extends Model
{
    use Uuid;

    protected $fillable = [
        'from_date', 'to_date', 'user_id', 'room_id', 'price', 'with_breakfast'
    ];

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function room(){
        return $this->belongsTo('App\Room', 'room_id');
    }

    public function billings(){
        return $this->hasMany('App\Billing');
    }

    public $incrementing = false;
}
