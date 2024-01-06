<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $table = 'transactions';
    protected $fillable = ['transaction_code', 'description', 'total_price', 'user_id', 'status', 'payment'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
