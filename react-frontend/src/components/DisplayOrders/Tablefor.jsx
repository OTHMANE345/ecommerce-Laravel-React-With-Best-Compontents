import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from '../../contexts/ContextProvider'
import './Tablefor.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SideBar from "../sidebar";

export default function Tablefor() {

    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState(null);

    const idRef = useRef();
    const idORef = useRef();
    const idfRef = useRef();




    useEffect(() => {
        getP()
    }, [])


    const getP = () => {
        axiosClient.get('/orders')
            .then(({ data }) => {
                setProducts(data)
                console.log(data);
                //  setNavig(true);

            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                }
            })
    }

    const onSubmitforUpdate = (evt) => {
        evt.preventDefault()
        setQuantity(parseInt(quantityyRef.current.value, 10))

        const payloaddd = {
            id: idORef.current.value,
        }
        //     console.log(payloaddd)
        //     axiosClient.post('/updateCart', payloaddd)
        //     .then(({data})=>{
        //         console.log(data);


        //     })
        // .catch(err => {
        //     const response = err.response;
        //     if(response && response.status == 422){
        //         console.log(response.data.errors);
        //     }
        // })


    }


    const onSubmitfordelete = (p) => {
        if(!window.confirm("Are you sure you want to delete this product")){
            return
        }
        const payloadd = {

            id: p.id,

        }
        axiosClient.post('/deleteOrder', payloadd)
            .then(({ data }) => {
                getP()
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col'>Titre</th>
                                <th scope='col'>prix</th>
                                <th scope='col'>description</th>
                                <th scope='col'></th>


                            </tr>

                        </thead>

                        <tbody>
                            {products.map(p => (<tr key={p.id}>

                                <td>{p.product_name}</td>
                                <td>{p.quantity}$</td>
                                <td>{p.total} </td>

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
