import React from 'react'
import { useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from '../../contexts/ContextProvider'
import './Tablefor.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SideBar from "../sidebar";

export default function Tablefor() {

    const [carts, setCarts] = useState([]);

    const {user} = useStateContext();
    const idRef = useRef();
    const [errors, setErrors] = useState(null);




     useEffect( () => {
        getC()
     } , [])


     const getC = () => {


        axiosClient.get('/getallc')
        .then(({data})=>{
            setCarts(data)
             console.log(data);
            //  setNavig(true);

        })
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            console.log(response.data.errors);
        }
    })
     }





    const onSubmitfordelete = (p) => {
        if(!window.confirm("Are you sure you want to delete this product")){
            return
        }
        const payloadd = {

            id: p.id,

        }
        axiosClient.post('/deleteCategorie', payloadd)
            .then(({ data }) => {
                getC()
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                }
            })


    }







  return (
    <div className='container my-50px'>
    <div className="row justify-content-center">
        <div className="col-md-3">

        <SideBar/>
        </div>


    <div className='col-md-9'>
    {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
    <Link to="/admin/createcategorie" className="list-group-item
                  font-weight-bold
                   list-group-item-action
                   btn btn-outline-warning
                   nav-link-admin-forproducts
                   ">
                   Add New Categorie
                  </Link>
        <table className="table">
            <thead>
                <tr>
                    <th scope='col'>Titre</th>

                    <th scope='col'></th>


                </tr>

            </thead>

            <tbody>
                {carts.map(p => (<tr key={p.id}>

                    <td>{p.title}</td>


                    <td>
                    <button  onClick={ev => onSubmitfordelete(p)} className='btn btn-danger'>
                                        supprimer
                                    </button>
                    </td>
                </tr>))}
                {/* <tr className='text-dark font-weight-bold'>
          <td colSpan={3} className='border border-succes'>Total</td>
          <td colSpan={3} className='border border-succes'>
            {{c::getSubtotal}}
          </td>
        </tr> */}
            </tbody>
        </table>

    </div>
</div>
</div>


  )
}
