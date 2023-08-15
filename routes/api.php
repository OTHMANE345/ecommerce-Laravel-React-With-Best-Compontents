<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductControllerApi;
use App\Http\Controllers\CartControllerApi;
use App\Http\Controllers\OrderControllerForerApi;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryControllerForApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[AuthController::class,'login']);
Route::post('/singup',[AuthController::class,'register']);
Route::get('/products',[ProductControllerApi::class,'show']);
Route::post('/showdetail',[ProductControllerApi::class,'showdetails']);
Route::post('/addtoCart',[CartControllerApi::class,'addProductToCart']);
Route::post('/carts',[CartControllerApi::class,'index']);
Route::post('/deleteCart',[CartControllerApi::class,'removeProductFromCart']);
Route::post('/updateCart',[CartControllerApi::class,'updateProductToCart']);
Route::post('/orderAll',[OrderControllerForerApi::class,'addOrder']);
Route::post('/admin/login',[AdminController::class,'adminLogin']);
Route::post('/admin/singup',[AdminController::class,'adminLogin']);
Route::get('/admin/products',[ProductControllerApi::class,'showforAdmin']);
Route::post('/deleteProduct',[ProductControllerApi::class,'destroy']);
Route::get('/orders',[OrderControllerForerApi::class,'index']);
Route::post('/create',[ProductControllerApi::class,'store']);
Route::put('/update',[ProductControllerApi::class,'update']);
Route::post('/createCategorie',[CategoryControllerForApi::class,'store']);
Route::get('/getallc',[CategoryControllerForApi::class,'show']);
Route::post('/deleteCategorie',[CategoryControllerForApi::class,'destroy']);
Route::get('/carts',[CategoryControllerForApi::class,'show']);
Route::post('/deleteOrder',[OrderControllerForerApi::class,'destroy']);
Route::post('/logout',[AdminController::class,'adminLogout']);
