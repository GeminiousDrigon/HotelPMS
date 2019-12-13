<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdditionalBooking extends Model
{
    protected $fillable = [
        'name',
        'price',
        'delete',
    ];

    protected $table = 'additional_booking';
}
