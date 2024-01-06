<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class RedirectAuthenticatedUsersController extends Controller
{
    public function home()
    {
        if (auth()->user()->role == 'admin') {
            return redirect('/dashboard');
        } elseif (auth()->user()->role == 'user') {
            return redirect('/orders');
        } else {
            return auth()->logout();
        }
    }
}
