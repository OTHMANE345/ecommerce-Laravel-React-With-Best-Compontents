<?php



namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class ProductControllerApi extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin')->except(["show","destroy","showdetails","store","update"]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.products.index")->with([
            "products" => Product::latest()->paginate(3),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("admin.products.create")->with([
            "categories" => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
     public function store(Request $request)
    {
        $this->validate($request, [
            "name" => "required|min:3",
            "description" => "required|min:10",
            "price" => "numeric|min:0",
            "image" => "required|image|mimes:png,jpg,jpeg|max:4048",
            "category_id" => "required|numeric",

        ]);
        if($request->has("image")){
            $file=$request->image;
            $imageName = "images/products/".time()."_".$file->getClientOriginalname();
            $file->move(public_path("images/products"),$imageName);
            $name=$request->name;

            Product::create([
            "name" => $request->name,
            "description" => $request->description,
            "price" => $request->price,
            "image" => $imageName,
            "category_id" => $request->category_id,
            ]);
 return response()->json(['status' => 'success'], 200);
    } else {
        return response()->json(['status' => 'error', 'message' => 'Image not found'], 400);
    }        }




    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show()
{
    $products = Product::latest()->get();
    foreach($products as $product){
        $product->categoryTitle = $product->category->title;
    }
    return response()->json($products);
}
/**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
public function showforAdmin()
{
    $products = Product::latest()->get();
    return response()->json($products);
}
public function showdetails(Request $request)
{
    $id = $request->id;

    $product = Product::find($id);
    return [
        "product" => $product
    ];
}


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return view("admin.products.edit")->with([
            "product" => $product,
            "categories" => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *

     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            "name" => "required|min:3",
            "description" => "required|min:10",
            "price" => "numeric|min:0",

        ]);
        $id = $request->id;

        $product = Product::find($id);

        if(    $product->update([
            "name" => $request->name,
            "description" => $request->description,
            "price" => $request->price,
            ]))   {        return response()->json(['status' => 'success'], 200);
            }   else {        return response()->json(['message' => 'error']);
            }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;

        $product = Product::find($id);

        if ($product) {
            $product->delete();

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
