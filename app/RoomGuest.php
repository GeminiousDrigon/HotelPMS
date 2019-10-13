<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomGuest extends Model
{
    use Uuid;

    protected $fillable = [
        'firstname', 'middlename', 'lastname', 'email', 'address', 'country', 'contactno', 'book_room_id',
    ];

    public function bookRoom()
    {
        return $this->belongsTo('App\BookRoom', 'book_room_id');
    }

    public $incrementing = false;
}
