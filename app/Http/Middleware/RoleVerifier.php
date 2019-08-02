<?php

namespace App\Http\Middleware;

use Closure;

class RoleVerifier
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {

      if($request->user()->role === $role){
        return $next($request);
      }
      else{
        if($request->user()->role === 'USER')
          return redirect('/user');
        else
          return redirect('/admin');
      }

    }
}
