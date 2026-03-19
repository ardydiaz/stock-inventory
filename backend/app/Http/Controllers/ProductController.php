<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{   
    // List all products
    public function index(){
        $products = Product::all();

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }
    
    // Create a new product
    public function store(Request $request){
       try{
            $validated = $request->validate([
                'name' => 'required',
                'sku' => 'required|unique:products',
                'price' => 'required|numeric',
                'category' => 'nullable|string',
                'current_stock' => 'nullable|integer',
                'status' => 'nullable|boolean'
            ]);
            $product = Product::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'data' => $product
            ], 201); // 201 = Created

       }catch(\Exception $e){
           return response()->json([
               'success' => false,
               'message' => 'Failed to create product',
               'error' => $e->getMessage()
           ], 400);
       }
    }
    
    // Get a single product
    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    // Update a product
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validated = $request->validate([
                'sku' => 'unique:products,sku,' . $id,
                'name' => 'sometimes|required',
                'price' => 'sometimes|required|numeric',
                'category' => 'sometimes|nullable|string',
                'current_stock' => 'sometimes|nullable|integer',
                'status' => 'sometimes|nullable|boolean'
            ]);

            $product->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => 'No query results!'
            ], 400);
        }
    }
}
