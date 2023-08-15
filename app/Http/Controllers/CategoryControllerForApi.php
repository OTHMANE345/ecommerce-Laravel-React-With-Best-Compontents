<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryControllerForApi extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:admin')->except(["show","index","destroy","store"]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.categories.index")->with([
            "categories" => Category::latest()->paginate(3),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("admin.categories.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "title" => "required|min:3",


        ]);


            Category::create([
            "title" => $request->title,
            ]);
            return
            [
                'success'=>true
            ];
        }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $categories = Category::latest()->get();
    return response()->json($categories);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return view("admin.categories.edit")->with([
            "category" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */

     public function update(Request $request, Category $category)
     {

         $this->validate($request, [
             "title" => "required|min:3",
         ]);

         $title = $request->title;
         $category->update([
             "title" => $title,
         ]);

         return redirect()->route("admin.categories.index")->withSuccess("Category updated");
     }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;

        $category = Category::find($id);

        if ($category) {
            $category->delete();

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
