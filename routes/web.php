<?php

use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\AdminTransactionController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/product/show', [ProductController::class, 'userShow'])->name('product.show');

Route::group(['middleware' => 'auth'], function () {

    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);

    Route::group(['middleware' => 'checkRole:admin'], function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/dashboard/transaction', [AdminTransactionController::class, 'index'])->name('dashboard.transaction');
        Route::get('/dashboard/transaction/print-all-transaction', [AdminTransactionController::class, 'printAllTransaction'])->name('dashboard.transaction.printall');
        Route::get('/dashboard/transaction/print-tetail-transaction', [AdminTransactionController::class, 'printDetailTransaction'])->name('dashboard.transaction.print.detail');

        Route::get('/dashboard/orders', [AdminOrderController::class, 'index'])->name('dashboard.order');
        Route::post('/dashboard/orders/confirm/{id}', [AdminOrderController::class, 'confirmPayment'])->name('dashboard.order.confirm');


        Route::get('/dashboard/product', [AdminProductController::class, 'index'])->name('dashboard.product');
        Route::get('/dashboard/product/create', [AdminProductController::class, 'create'])->name('dashboard.product.create');
        Route::get('/dashboard/product/edit', [AdminProductController::class, 'edit'])->name('dashboard.product.edit');
        Route::post('/dashboard/product/store', [AdminProductController::class, 'store'])->name('dashboard.product.store');
        Route::post('/dashboard/product/update/{id}', [AdminProductController::class, 'update'])->name('dashboard.product.update');
        Route::post('/dashboard/product/destroy/{id}', [AdminProductController::class, 'destroy'])->name('dashboard.product.destroy');


    });

    Route::group(['middleware' => 'checkRole:user'], function () {
        Route::get('/orders', [OrderController::class, 'index'])->name('orders');
        Route::post('/cart/add', [OrderController::class, 'addToCart'])->name('cart.add');
        Route::post('/cart/delete/{id}', [OrderController::class, 'destroy'])->name('cart.destroy');
        Route::post('/checkout', [OrderController::class, 'checkout'])->name('checkout');

        Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction');
        Route::get('/transaction/payment-upload', [TransactionController::class, 'paymentUpload'])->name('transaction.payment.upload');
        Route::post('/transaction/payment-upload/{id}', [TransactionController::class, 'storePayment'])->name('transaction.payment.store');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
