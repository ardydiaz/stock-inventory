<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'category',
        'price',
        'current_stock',
        'status'
    ];

    public function movements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
