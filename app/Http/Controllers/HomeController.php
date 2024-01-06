<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Home', [
            'products' => Product::orderBy('updated_at', 'DESC')->take(4)->get()
        ]);
    }
}
