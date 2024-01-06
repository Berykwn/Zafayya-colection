<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Product', [ 
            'product' => Product::latest()->paginate(8),
            'allProduct' => Product::latest()->get(),
        ]);
    }

    public function userShow(Product $product, Request $request) {
        $productDetail = $product->find($request->id);

        return Inertia::render('User/ProductDetail', [
            'product' => $productDetail,
        ]);
    }
}
