<?php

namespace App\Mail;

use App\Booking;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BookingCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $booking;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Booking $booking)
    {
        //
        $this->user = $user;
        $this->booking = $booking;
        
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('bluepoolgarden2@gmail.com', 'Booking Created')
            ->view('emails.home');
    }
}
