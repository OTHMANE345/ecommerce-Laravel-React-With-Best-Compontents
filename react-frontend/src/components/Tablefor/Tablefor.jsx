import React from 'react'
import { useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from '../../contexts/ContextProvider'
import './Tablefor.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Tablefor() {

    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [errors, setErrors] = useState(null);

    const {user} = useStateContext();
    const quantityyRef = useRef();

    const idRef = useRef();
    const idORef = useRef();
    const idfRef = useRef();

    function handleImage(e) {
        setQuantity(parseInt(quantityyRef.current.value, 10))
        console.log(quantity)
     }



     useEffect( () => {
        getC()
     } , [])


     const getC = () => {
        const payload ={
            user_id:user.id,

        }
        axiosClient.post('/carts', payload)
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

    //  const onSubmitforUpdate = (evt) =>{
    //     evt.preventDefault()
    //     // setQuantity(parseInt(quantityyRef.current.value, 10))

    //     // const payloaddd ={
    //     //     id:idORef.current.value,
    //     //     quantity:quantity,
    //     // }
    //     const formData = new FormData()
    //     const id = idORef.current.value;
    //     formData.append('id',id)
    //     formData.append('quantity',parseInt(quantity))
    //     // console.log(formData)
    //     axiosClient.post('/updateCart',formData, {
    //         method: 'POST',
    //     })
    //     .then(({data})=>{
    //         console.log(data);


    //     })
    // .catch(err => {
    //     const response = err.response;
    //     if(response && response.status == 422){
    //         console.log(response.data.errors);
    //     }
    // })


    // }

    const onSubmitfordelete = (p) => {
        if(!window.confirm("Are you sure you want to delete this product")){
            return
        }
        const payloadd = {

            id: p.id,

        }
        axiosClient.post('/deleteCart', payloadd)
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

    const OrderAll = (ev) =>{
        ev.preventDefault()
        const payloadd ={

            user_id:idfRef.current.value,

        }
        console.log(payloadd)
        axiosClient.post('/orderAll', payloadd)
        .then(({data})=>{
            console.log(data);
            getC()


        })
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            console.log(response.data.errors);
        }
    })


    }





  return (
         <div className='container '>
        <div className="row">
        {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>Image</th>
                        <th scope='col'>Titre</th>
                        <th scope='col'>prix</th>
                        <th scope='col'>total</th>
                        <th scope='col'>quantity</th>

                        <th scope='col'></th>


                    </tr>

                </thead>

                <tbody>
                {carts.map(c => ( <tr key={c.id}>
                        <td>
                            <img src={`http://127.0.0.1:8000/${c.image}`} alt=""
                              width={50}
                              height={50}
                              className='img-fluid rounded'
                            />
                        </td>
                        <td>{c.product_name}</td>
                        <td>{c.price}$</td>
                        <td>{c.price * c.quantity} $</td>
                        <td>{c.quantity} </td>

                        {/* <td>
                             <form className='d-flex flex-row justify-content-center align_items-center' onSubmit={onSubmitforUpdate}>
                                <div className="form-group">
                                <input  ref={quantityyRef}
                                onChange={handleImage}
                                 type="text"
                                 className="form-control"
                                 placeholder="Quantity"
                                  />

                                    <input ref={idORef} type="number"
                                     className='form-control'
                                     aria-describedby='helpId'
                                     min="1"
                                     value={c.id}
                                     readOnly
                                     hidden
                                    />
                                </div>
                                <div className="form-group">
                                  <button type="submit"
                                  className='btn btn-sm btn-warning mx-2' >
                                      modifier
                                  </button>
                                </div>
                            </form>

                        </td> */}
                        <td>
                        <button  onClick={ev => onSubmitfordelete(c)} className='btn btn-danger'>
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
            <form id="forlk"className='d-flex flex-row justify-content-center align_items-center' onSubmit={OrderAll}>
                        <div className="form-group">

                                    <input ref={idfRef} type="number" className='form-control'
                                     aria-describedby='helpId'
                                     min="1"
                                     value={user.id}
                                     readOnly
                                     hidden
                                    />
                                </div>
                                <div className="form-group">
                                  <button className='btn btn-sm btn-primary' type='submit'>
                                      order all
                                  </button>
                                </div>
                            </form>
        </div>
    </div>

  )
}
