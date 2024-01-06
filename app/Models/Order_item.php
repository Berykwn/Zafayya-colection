<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_item extends Model
{
    use HasFactory;

    protected $table = 'orders_item';
    
    protected $fillable = ['order_id', 'product_id', 'qty'];

    public function order()
    {
        return $this->belongsTo(Order::class); 
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
