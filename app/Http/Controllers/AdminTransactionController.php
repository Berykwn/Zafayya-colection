<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTransactionController extends Controller
{
    public function index()
    {
        $transaction = Transaction::with(['user'])->where('status', 'Success')->latest()->paginate(6);
        $allTransaction = Transaction::with(['user'])->where('status', 'Success')->latest()->get();

        return Inertia::render('Admin/Transaction/Transaction', [
            'transaction' => $transaction,
            'allTransaction' => $allTransaction,
        ]);
    }

    public function printAllTransaction()
    {
        $transactions = Transaction::with(['user'])->where('status', 'Success')->latest()->get();

        $totalTransaction = $transactions->sum('total_price');

        return Inertia::render('Admin/Transaction/PrintAllTransactionReport', [
            'transaction' => $transactions,
            'totalTransaction' => $totalTransaction
        ]);
    }

    public function printDetailTransaction(Transaction $transaction, Request $request)
    {
        $transaction = Transaction::with(['user'])->find($request->id);

        return Inertia::render('Admin/Transaction/PrintDetailTransaction', [
            'transaction' => $transaction,
        ]);
    }
}
