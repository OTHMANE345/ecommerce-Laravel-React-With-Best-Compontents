<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Cart;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;


class OrderControllerForerApi extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:admin')->except(["show","store","addOrder","index","destroy"]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::latest()->get();
        return response()->json($orders);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }
    public function addOrder(Request $request)
{
    $user_id = $request->user_id;

    foreach (Cart::where('user_id', $user_id)->latest()->get() as $item) {
        Order::create([
            "product_id" => $item->product_id,
            "product_name" => $item->product_name,
            "quantity" => $item->quantity,
            "price" => $item->price,
            "total" => $item->price * $item->quantity,
            "status" => "1",
            "user_id" => $user_id
        ]);
    }

    Cart::where('user_id', $user_id)->delete();

    return [
        'success' => 'Order effectue avec succes'
    ];
}


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {

        $request->validate([
            'status' => 'required',
        ]);

        $order->update([
            'status' => $request->status,
        ]);
        return redirect()->back()->withSuccess("Order updated");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $id = $request->id;

        $order = Order::find($id);

        if ($order) {
            $order->delete();

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
