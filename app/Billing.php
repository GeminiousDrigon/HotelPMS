<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Billing extends Model
{
    use Uuid;

    protected $fillable = [
        'type', 'amount', 'booking_id'
    ];

    public function booking()
    {
        return $this->belongsTo('App\Booking', 'booking_id');
    }

    public $incrementing = false;
}
