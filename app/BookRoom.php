<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;
use Illuminate\Support\Str;

class BookRoom extends Model
{
    // use Uuid;

    protected $fillable = [
        'room_type_id',
        'room_id',
        'price',
        'with_breakfast',
        'guest_no',
        'booking_id',
        'color',
        'rate_id',
        'additional_beds'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $colors = array("#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#f1c40f", "#e67e22", "#e74c3c");
            $model->color = $colors[rand(0, 7)];
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });
    }

    public function booking()
    {
        return $this->belongsTo('App\Booking');
    }

    public function roomType()
    {
        return $this->belongsTo('App\RoomType');
    }

    public function rate()
    {
        return $this->belongsTo('App\Rate');
    }

    public function room()
    {
        return $this->belongsTo('App\Room');
    }

    public function guests()
    {
        return $this->belongsToMany('App\RoomGuest')->withTimestamps();
    }
    

    public $incrementing = false;
}
