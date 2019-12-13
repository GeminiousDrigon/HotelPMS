<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Uuid;

class Additional extends Model
{
    use Uuid;
    //
    protected $fillable = [
        'name',
        'price',
        'delete',
    ];

}
