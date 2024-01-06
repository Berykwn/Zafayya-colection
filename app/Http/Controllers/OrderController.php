<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_item;
use Illuminate\Support\Str;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{

    public function index()
    {
        $order = Order_item::with(['order', 'product'])
            ->whereHas('order', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->latest()
            ->get();

        return Inertia::render('User/Order', [
            'orders' => $order
        ]);
    }

    // OrderItemController.php
    public function addToCart(Request $request)
    {
        // Create or get the latest order for the authenticated user
        $order = Order::where('user_id', Auth::id())->latest()->first();

        if (!$order) {
            // If the user doesn't have an order, create a new one
            $order = new Order([
                'user_id' => Auth::id(),
                'total_amount' => 0, // You might want to set a default value or update it later
            ]);

            $order->save();
        }

        // Add the item to the order
        $orderItem = new Order_item([
            'product_id' => $request->input('product_id'),
            'qty' => $request->input('qty'),
        ]);

        $order->items()->save($orderItem);

        return redirect()->route('orders')->with('message', 'Successfully added product to cart!');
    }

    public function checkout(Order $order, Order_item $order_item, Request $request)
    {
        $transactionCode = str_shuffle(Str::random(8) . rand(1000, 9999));

        $transaction = new Transaction([
            'transaction_code' => $transactionCode,
            'description' => $request->description,
            'total_price' => $request->total_price,
            'user_id' => Auth::id(),
            'status' => 'Menunggu pembayaran'
        ]); 

        $transaction->save();

        //delete order_item
        $order_item = Order_item::with(['order', 'product'])
            ->whereHas('order', function ($query) {
                $query->where('user_id', Auth::id());
            })->delete();

        return redirect()->route('transaction')->with('message', 'Transaction Successfully!');
    }

    public function destroy(Order_item $order_item, Request $request)
    {
        $order_item = Order_item::find($request->id);

        $order_item->delete();

        return redirect()->back()->with('message', 'Successfully remove product to cart!');
    }
}


