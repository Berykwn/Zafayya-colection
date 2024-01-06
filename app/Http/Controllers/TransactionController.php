<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index()
    {
        $transaction = Transaction::where('user_id', Auth::id())->orderBy('updated_at', 'desc')->get();

        return Inertia::render('User/Transaction', [
            'transaction' => $transaction
        ]);
    }

    public function paymentUpload(Transaction $transaction, Request $request)
    {
        $transaction = $transaction->find($request->id);

        return Inertia::render('User/PaymentUpload', [
            'transaction' => $transaction
        ]);
    }

    public function storePayment(TransactionRequest $request, Transaction $transaction, $id)
    {
        $existingTransaction = Transaction::findOrFail($id);

        $validatedData = $request->validated();

        $payment = $existingTransaction->payment;

        if ($request->hasFile('payment')) {
            $payment = $validatedData['payment'];

            $paymentName = time() . '_' . Str::slug(pathinfo($payment->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $payment->getClientOriginalExtension();

            if (!$payment->storeAs('img/payments/', $paymentName)) {
                return redirect()->back()->with('error', 'cannot upload the image.');
            }
        }

        $existingTransaction->update(array_merge($validatedData, ['payment' => $paymentName]));

        return redirect()->route('transaction')->with('message', 'Upload payment proof succesfully.');

    }
}
