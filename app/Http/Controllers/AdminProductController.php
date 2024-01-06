<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Product/Product', [
            'product' => Product::latest()->paginate(6),
            'allProduct' => Product::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Product/Create');
    }

    public function store(ProductRequest $request)
    {
        $validatedData = $request->validated();

        $image = $validatedData['image'];

        $imageName = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();

        if (!$image->storeAs('img/products/', $imageName)) {
            return redirect()->back()->with('error', 'Error to upload image');
        }

        Product::create(array_merge($validatedData, ['image' => $imageName]));

        return redirect()->route('dashboard.product')->with('message', 'Successfuly adding new product.');
    }

    public function edit(Product $product, Request $request)
    {
        $product = $product->find($request->id);

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product
        ]);
    }

    public function update(ProductRequest $request, Product $product, $id)
    {
        $existingProduct = Product::findOrFail($id);

        $validatedData = $request->validated();

        $imageName = $existingProduct->image;

        if ($request->hasFile('image')) {
            $image = $validatedData['image'];

            $imageName = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();

            if (!$image->storeAs('img/products/', $imageName)) {
                return redirect()->back()->with('error', 'Error to upload image');
            }
        }

        $existingProduct->update(array_merge($validatedData, ['image' => $imageName]));

        return redirect()->route('dashboard.product')->with('message', 'Successfuly update the product.');
    }

    public function destroy(Product $product, Request $request)
    {
        $product = Product::find($request->id);

        //cek apakah di storage ada foto
        if (Storage::exists('img/products' . $product->images)) {
            Storage::delete('img/products' . $product->images);
        }

        $product->delete();

        return redirect()->route('dashboard.product')->with('message', 'Product has been deleted!');
    }
}
