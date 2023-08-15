import React from 'react'
import img1 from "../../assets/img/pexels-markus-spiske-1343537.jpg";
import './showProduct.css';
import {  useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import axiosClient from "../../axios-client";
import {useEffect, useState} from "react";
import { useRef } from 'react';
import { useStateContext } from '../../contexts/ContextProvider'

export default function showProduct() {
const {id}= useParams();
const quantityRef = useRef();
const [errors, setErrors] = useState(null);

 const {user} = useStateContext();
const userId = user ? user.id : null;
const [products, setProducts] = useState([]);
const navigate = useNavigate();

useEffect( () => {
   getP()
} , []);


const getP = () => {
    const payload ={
        id: id,
    }

   axiosClient.post('/showdetail', payload)
   .then(({data})=>{
       setProducts(data.product)
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

const onSubmit = (ev) =>{
    ev.preventDefault()
    const payload ={
        price:products.price,
        product_id:products.id,
        product_name:products.name,
        user_id:user.id,
        quantity:quantityRef.current.value,
        image:products.image,

    }
    axiosClient.post('/addtoCart', payload)
    .then(({data})=>{
        console.log(data);

navigate('/carts')

    })
.catch(err => {
    const response = err.response;
    if(response && response.status == 422){
        console.log(response.data.errors);
    }
})


}

    return (
    <div className='is-showProduct'>
            <div className='is-wrapper'>

      <img src={`http://127.0.0.1:8000/${products.image}`} alt="Header img"  />
        <div className="is-text-box">
        {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
                <h2>{products.name}</h2>
                <h3>{products.price} $</h3>
                <p>{products.categoryTitle}</p>

                <p>{products.description}</p>
                <form  onSubmit={onSubmit}>
            <input  ref={quantityRef}  type="number" className="form-control"   placeholder="Quantity" />

             <button className="btn btn-primary my-3" >Add to Cart</button>

            </form>
          </div>

          </div>

    </div>
  )
}












