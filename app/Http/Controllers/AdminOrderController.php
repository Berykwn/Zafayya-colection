<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $transaction = Transaction::with(['user'])->where('status', 'Menunggu Konfirmasi')->latest()->paginate(6);

        return Inertia::render('Admin/Order/Order', [
            'transaction' => $transaction,
            'allTransaction' => Transaction::with(['user'])->where('status', "Menunggu Konfirmasi")->latest()->get(),
        ]);
    }

    public function confirmPayment(Transaction $transaction, Request $request)
    {
        $transaction = Transaction::find($request->id);

        $transaction->status = "Success";

        $transaction->save();

        return redirect()->back()->with('message', 'Order confirmation successfully!');
    }
}
