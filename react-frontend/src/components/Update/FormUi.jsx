import React,{useEffect, useRef, useState} from "react";


import img1 from "../../assets/img/pexels-markus-spiske-1343537.jpg";
import styles from './Form.module.css';
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Form = () => {


const {id}= useParams();
const [products, setProducts] = useState([]);

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
    const nameRef = useRef();
    const idRef = useRef();
    const navigate = useNavigate();

    const descriptionRef = useRef();
    const prixRef = useRef();
     const [images,setImages] = useState('')


     const [errors, setErrors] = useState(null);


     const onSubmit = (ev) =>{
        ev.preventDefault()

        const payload ={
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: prixRef.current.value,
            id: products.id,

        }
        axiosClient.put('/update', payload)
        .then(({data})=>{
             console.log(data);
             navigate('/admin/products')

        })
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            setErrors(response.data.errors)
        }
    })

}
  return (
    <section className={styles.FormFor}>
        <div className={styles.register}>
         <div className={styles.col1}>
            <h2>Update product</h2>
            {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <span>register and enjoy the service</span>
            <form id={styles.form345} className={`${styles.flex34} ${styles.flexcol7}`}  onSubmit={onSubmit} >
             <input  type="text" placeholder={products.name}  ref={nameRef} />
             <input  type="text" placeholder={products.description}  ref={descriptionRef} />
             <input  type="number"  placeholder={products.price}   ref={prixRef}  />
             <button  className={styles.btn}>Update Product</button>
            </form>
         </div>
         <div className={styles.col2}>
            <img src={`http://127.0.0.1:8000/${products.image}`} alt="a header image" />
         </div>
        </div>
    </section>
  );
};

export default Form; // Exporting the corrected Card component
