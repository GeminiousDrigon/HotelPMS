<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PaymentAdded extends Notification
{
    use Queueable;

    private $payment;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($payment)
    {
        //
        $this->payment = $payment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            "type" => $this->payment["type"],
            "action_url" => "/booking/view/" . $this->payment['booking_id'],
            "message" => "A payment of " . $this->paymnet["amount"] . " for " . $this->payment["type"] . " has just been added! Through ",
            "title" => "Payment added!"
        ];
    }

    public function toDatabase($notifiable)
    {
        return [
            "type" => $this->payment["type"],
            "action_url" => "/bookings/view/" . $this->payment['booking_id'],
            "message" => "A payment of " . $this->payment["amount"] . " for " . $this->payment["type"] . " has just been added!",
            "title" => "Payment added!"
        ];
    }
}
