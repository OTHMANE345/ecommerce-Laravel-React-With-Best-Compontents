<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthenticationException;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

      if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
        return response([
            'message'=> 'Credentials are not correct'       ]);
                       }
     /** @var \App\Models\User $user */

        $user = Auth::user();
          $token= $user->createToken('email')->plainTextToken;





        return [
            'token' => $token,
            'user' => $user,
            'success' => true
        ];
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user= User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
$token= $user->createToken('email')->plainTextToken;
        return [
            'token' =>$token,
            'user' => $user,
            'success' => true        ];
    }
}
