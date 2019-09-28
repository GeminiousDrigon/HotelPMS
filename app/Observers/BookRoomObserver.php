<?php

namespace App\Observers;

use App\BookRoom;
use phpseclib\Crypt\Random;

class BookRoomObserver
{
    /**
     * Handle the = book room "created" event.
     *
     * @param  \App\BookRoom  $bookRoom
     * @return void
     */
    public function created(BookRoom $bookRoom)
    {
        $colors= array("#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#f1c40f", "#e67e22", "#e74c3c");
        $bookRoom->color = $colors[rand(0,7)];
        //
    }

    /**
     * Handle the = book room "updated" event.
     *
     * @param  \App\BookRoom  $bookRoom
     * @return void
     */
    public function updated(BookRoom $bookRoom)
    {
        //
    }

    /**
     * Handle the = book room "deleted" event.
     *
     * @param  \App\BookRoom  $bookRoom
     * @return void
     */
    public function deleted(BookRoom $bookRoom)
    {
        //
    }

    /**
     * Handle the = book room "restored" event.
     *
     * @param  \App\BookRoom  $bookRoom
     * @return void
     */
    public function restored(BookRoom $bookRoom)
    {
        //
    }

    /**
     * Handle the = book room "force deleted" event.
     *
     * @param  \App\BookRoom  $bookRoom
     * @return void
     */
    public function forceDeleted(BookRoom $bookRoom)
    {
        //
    }
}
