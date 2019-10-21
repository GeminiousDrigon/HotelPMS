<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomGuest extends Model
{
    use Uuid;

    protected $fillable = [
        'firstname', 'middlename', 'lastname', 'email', 'address', 'country', 'contactno', 'book_room_id', 'noOfChild'
    ];

    public function bookRoom()
    {
        return $this->belongsToMany('App\BookRoom')->withTimestamps();
    }

    public $incrementing = false;
}
