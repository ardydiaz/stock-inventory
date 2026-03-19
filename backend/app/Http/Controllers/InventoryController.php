<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
     // Stock In
    public function stockIn(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'reference' => 'required',
                'remarks' => 'nullable|string',
            ]);

            return DB::transaction(function () use ($request) {

                $product = Product::findOrFail($request->product_id);

                $product->increment('current_stock', $request->quantity);

                $movement = StockMovement::create([
                    'product_id' => $product->id,
                    'type' => 'in',
                    'quantity' => $request->quantity,
                    'reference' => $request->reference,
                    'remarks' => $request->remarks,
                    'movement_date' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Stock-in successful',
                    'data' => $movement,
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Stock-in failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Stock Out
    public function stockOut(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'reference' => 'required',
                'remarks' => 'nullable|string',
            ]);

            return DB::transaction(function () use ($request) {

                $product = Product::findOrFail($request->product_id);

                if ($product->current_stock < $request->quantity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient stock'
                    ], 400);
                }

                $product->decrement('current_stock', $request->quantity);

                $movement = StockMovement::create([
                    'product_id' => $product->id,
                    'type' => 'out',
                    'quantity' => $request->quantity,
                    'reference' => $request->reference,
                    'remarks' => $request->remarks,
                    'movement_date' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Stock-out successful',
                    'data' => $movement,
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Stock-out failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Inventory Movements
    public function movements()
    {
        try {
            $movements = StockMovement::with('product')
                ->latest('movement_date')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $movements
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch movements',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
