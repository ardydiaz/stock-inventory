<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{  
    public function index(Request $request){
        
        try {
            $query = Product::query();
            // 🔍 Search by product name
            if ($request->filled('name')){ 
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            //  Filter by exact price 
            if ($request->filled('price')) {
                $query->where('price', $request->price); 
            }
            
            // Filter by price range (better than exact)
            if ($request->filled('min_price')){ 
                $query->where('price', '>=', $request->min_price); 
            }

            if ($request->filled('max_price')) { 
                $query->where('price', '<=', $request->max_price); 
            } 

             // Show only soft-deleted products
            if ($request->get('deleted') === 'only') {
                $query->onlyTrashed();
            }
            $products = $query->latest()->get();
            return response()->json([ 'success' => true, 'data' => $products ]);

        }  catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage()
            ], 400);
        }
    
    }
    
    // Create a new product
    public function store(Request $request){
       try{
            $validated = $request->validate([
                'name' => 'required',
                'sku' => 'required|string|max:100|unique:products,sku', // SKU must be unique
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

       }catch (\Illuminate\Validation\ValidationException $e) {
        // Return JSON with  Validation error SKU already exists
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
       
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

    //soft delete a product
    public function destroy($id){
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // restore a soft-deleted product
    public function restore($id){
       try {
            $product = Product::withTrashed()->findOrFail($id);

            $product->restore();

            return response()->json([
                'success' => true,
                'message' => 'Product restored successfully',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore product'
            ], 400);
        }
    }
}
