<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Booking;
use App\Notifications\PendingBookingCleanup;
use App\Notifications\UserBookingCanceled;
use App\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();

        $schedule->call(function () {
            // DB::table('recent_users')->delete();
            $dayAgo = 2; // where here there is your calculation for now How many days
            $dayToCheck = Carbon::now()->subDays($dayAgo);
            $bookings = Booking::whereDate("created_at", '<=', $dayToCheck)->where('status', '=', 'PENDING')->get();

            foreach ($bookings as $booking) {
                # code...
                $booking->status = "CANCELED";
                $booking->save();
                $user = User::find($booking->user_id);
                $user->notify(new UserBookingCanceled($booking));
            }

            $admins = User::whereIn('role_id', array(2, 3))->get();
            Notification::send($admins, new PendingBookingCleanup(count($bookings)));
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
