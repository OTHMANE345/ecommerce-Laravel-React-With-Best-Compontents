import {createBrowserRouter} from "react-router-dom";
import FormforSingUp from "./components/FormForSingUp/FormUiforSingUp";
import Form from "./components/Form/FormUi";

import Product from "./components/CardUIandJs/Cards";
import ShowTheProduct from "./components/showProduct/showProduct";
import Carts from "./components/Tablefor/Tablefor";
////

import Loginforadmin from "./components/LoginForAdmin/FormUi";
import ProductsforAdmin from "./components/DisplayProducts/Tablefor";
import OrdersFoeAdmin from "./components/DisplayOrders/Tablefor";
import AddN from "./components/AddNewP/FormUi";
import UppD from "./components/Update/FormUi";
import AddC from "./components/AddNewC/FormUi";
import Categor from "./components/DisplayCategories/Tablefor";

import DefaultLayout from './components/DefaultLayout';
import GuestLayout from "./components/GuestLayout";
import AdminLayouts from "./components/adminlayouts";

const router =  createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[

                {
                    path:'/login',
                    element:<Form/>
                },
                {
                    path:'/',
                    element:<Form/>
                },
                {
                    path:'/singup',
                    element:<FormforSingUp/>
                },
                {
                    path:'/products',
                    element:<Product/>
                },
                {
                    path:'/showdetailsofproduct/:id',
                    element:<ShowTheProduct/>
                },
                {
                    path:'/carts',
                    element:<Carts/>
                },

        ]
    },
    {
        path:'/admin',
        element:<AdminLayouts/>,
        children:[

                {
                    path:'/admin',
                    element:<Loginforadmin/>
                },
                {
                    path:'/admin/login',
                    element:<Loginforadmin/>
                },
                {
                    path:'/admin/products',
                    element:<ProductsforAdmin/>
                },
                {
                    path:'/admin/orders',
                    element:<OrdersFoeAdmin/>
                },
                {
                    path:'/admin/create',
                    element:<AddN/>
                },
                {
                    path:'/admin/update/:id',
                    element:<UppD/>
                },
                {
                    path:'/admin/categorie',
                    element:<Categor/>
                },
                {
                    path:'/admin/createcategorie',
                    element:<AddC/>
                },





        ]
    },

    // {
    //     path:'/',
    //     element:<GuestLayout/>,
    //      children:[

    //             {
    //                 path:'/signup',
    //                 element:<Form/>
    //             },

    //     ]
    // },


])


 export default router;
