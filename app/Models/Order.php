<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = ['user_id', 'total_amount'];


    public function items()
    {
        return $this->hasMany(Order_item::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
