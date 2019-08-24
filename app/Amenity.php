<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Amenity extends Model
{
    use Uuid;

    protected $fillable = [
        'name', 'icon'
    ];

    public function rooms(){
        return $this->belongsToMany('App\Room');
    }

    public $incrementing = false;
}
