<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Auth\AuthenticationException;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin')
            ->except(["showAdminLoginForm", "adminLogin","adminLogout"]);
    }
    public function index(){
        return view("admin.index")->with([
            "products" => Product::all(),
            "orders" => Order::all()
        ]);
    }
    public function showAdminLoginForm(){
        return view("admin.auth.login");
    }
    public function adminLogin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:4'
        ]);

        if (auth()->guard("admin")->attempt([
            'email' => $request->email,
            'password' => $request->password
        ], $request->get("remember"))) {

            $user = Admin::where('email', $request->email)->first();

            if (!$user || !$user->checkPassword($request->password)) {
                throw new AuthenticationException('Invalid credentials');
            }

            $token = $user->createToken('admin-token');


            return [
                'token' => $token->plainTextToken,
                'success' => true
            ];
        }

    }

    public function adminLogout(Request $request){


        // auth()->guard("admin")->logout();

if(auth()->guard("admin")){
    auth()->logout();
    return  [
        'success' => true
    ];
} else{
    $id = $request->id;

    $user = User::find($id);
    $user->currentAccessToken()->delete();
    return  [
        'success' => true
    ];

}

    }
}
