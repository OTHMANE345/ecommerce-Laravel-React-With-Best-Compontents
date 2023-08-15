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
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    const idORef = useRef();
    const idfRef = useRef();
    const idRef = useRef();


    // useEffect(() => {
    //     getP()
    // }, [])

    useEffect(() => {
        getP()
    }, [])

    useEffect(() => {
        const idInput = document.getElementById("id_delete")
        if (idInput) {
            idRef.current = idInput;
        }
    }, [])


    const getP = () => {
        axiosClient.get('/products')
            .then(({ data }) => {

                setLoading(false)
                setProducts(data)
                console.log(data);
                //  setNavig(true);

            })
            .catch(err => {
                setLoading(true)
                const response = err.response;
                if (response && response.status == 422) {
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
        axiosClient.post('/deleteProduct', payloadd)
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

                    <SideBar />
                </div>


                <div className='col-md-9'>
                {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
                    <Link to="/admin/create" className="list-group-item
                  font-weight-bold
                   list-group-item-action
                   btn btn-outline-warning
                   nav-link-admin-forproducts
                   ">
                        Add New Products
                    </Link>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col'>Image</th>
                                <th scope='col'>Titre</th>
                                <th scope='col'>prix</th>
                                <th scope='col'>description</th>
                                <th>category title</th>
                                <th scope='col'></th>
                                <th scope='col'></th>


                            </tr>

                        </thead>
                        {loading && <tbody>
                            <tr>
                                <td colSpan={6} className='text-center'>
                                    Loading...
                                </td></tr>
                        </tbody>
                        }
                        {!loading && <tbody>
                            {products.map(p => (<tr key={p.id}>
                                <td>
                                    <img src={`http://127.0.0.1:8000/${p.image}`} alt=""
                                        width={50}
                                        height={50}
                                        className='img-fluid rounded'
                                    />
                                </td>
                                <td>{p.name}</td>
                                <td>{p.price}$</td>
                                <td>{p.description.slice(0, 20)} </td>
                                <td>{p.categoryTitle} </td>

                                <td>
                                    <Link className="btn btn-outline-warning" to={'/admin/update/' + p.id} >Update</Link>

                                </td>
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
                        </tbody>}
                    </table>

                </div>
            </div>
        </div>

    )
}
