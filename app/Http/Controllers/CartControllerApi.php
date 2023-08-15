<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartControllerApi extends Controller
{


    public function index(Request $request)
    {
        $user_id = $request->user_id;
        $carts = Cart::where('user_id', $user_id)->latest()->get();
        return response()->json($carts);
    }



public function addProductToCart(Request $request)
{
    $this->validate($request, [
        "product_name" => "required|min:3",
        "price" => "numeric|min:0",
        "quantity" => "required|min:1", // Add "quantity" to validation rules
    ]);

    // Print the request data for debugging
    var_dump($request->all());

    // Create the product record
    Cart::create([
        "product_id" => $request->product_id,
        "price" => $request->price,
        "user_id" => $request->user_id,
        "image" => $request->image,
        "product_name" => $request->product_name,
        "quantity" => $request->quantity,
    ]);

    return [
        "success" => true
    ];
}


    public function updateProductToCart(Request $request){
        $id = $request->id;

        $cart = Cart::find($id);
       if($cart){
        $cart->quantity = $request->quantity;
        $cart->save();
        return response()->json(['message' => 'success']);
       } else {
        return response()->json(['message' => 'error']);
       }

    }

    public function removeProductFromCart(Request $request){
        $id = $request->id;

        $cart = Cart::find($id);

        if ($cart) {
            $cart->delete();

            return [
                "success" => true
            ];
        } else {
            return [
                "success" => false
            ];
        }
    }
}
