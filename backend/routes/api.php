<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InventoryController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/add-products', [ProductController::class, 'store']);
    Route::get('/products/show/{id}', [ProductController::class, 'show']);
    Route::put('/products/update/{id}', [ProductController::class, 'update']);

    // Inventory
    Route::post('/inventory/stock-in', [InventoryController::class, 'stockIn']);
    Route::post('/inventory/stock-out', [InventoryController::class, 'stockOut']);
    Route::get('/inventory/movements', [InventoryController::class, 'movements']);

});