<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Booking extends Model
{
    use Uuid;

    protected $fillable = [
        'status', 'from_date', 'to_date', 'user_id', 'room_id', 'price', 'with_breakfast', 'checkin_date', 'checkout_date', 'status', 'room_type_id', 'arrival',
        'noOfChild', 'additional_beds','payment_method'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function rooms()
    {
        return $this->hasMany('App\BookRoom');
    }

    public function billings()
    {
        return $this->hasMany('App\Billing');
    }

    public function additionals(){
        return $this->belongsToMany('App\Additional')->withPivot('price', 'quantity', 'id');
    }

    public $incrementing = false;
}
