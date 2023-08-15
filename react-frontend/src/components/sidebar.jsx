import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider";

import axiosClient from "../axios-client";
export default function sidebar() {

    const {user, token} = useStateContext()
    const navigate = useNavigate();
    const {setUser, setToken} = useStateContext();

    const logout = (ev) =>{
        ev.preventDefault()
        const payload ={

            user_id:"1",


        }
        axiosClient.post('/logout', payload)
        .then(({data})=>{
             setUser({})
             setToken(null)
            localStorage.removeItem('ACCESS_TOKEN')
            navigate('/admin/login')
            console.log(data);



        })
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            console.log(response.data.errors);
        }
    })


    }
  return (
<ul className="list-group mb-3">
    <Link to="/admin/orders" className="list-group-item

    font-weight-bold
    list-group-item-action">
        Commandes
        </Link>
        <Link to="/admin/products" className="list-group-item

font-weight-bold
list-group-item-action">
    Products
    </Link>
    <Link to="/admin/categorie" className="list-group-item

font-weight-bold
list-group-item-action">
    Categories
    </Link>

{token && (
                <Link to="/login" className="list-group-item

                font-weight-bold
                list-group-item-action"  onClick={logout}>log out</Link>
               )}
    </ul>
  )
}


