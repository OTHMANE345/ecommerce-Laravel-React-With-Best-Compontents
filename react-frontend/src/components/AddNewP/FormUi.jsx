import React,{useEffect, useRef, useState} from "react";


import img1 from "../../assets/img/pexels-markus-spiske-1343537.jpg";
import styles from './Form.module.css';
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Form = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const prixRef = useRef();
     const [images,setImages] = useState('')
     const [errors, setErrors] = useState(null);
     const [carts, setCarts] = useState([]);
     const navigate = useNavigate();

     function handleImage(e) {
        setImages(e.target.files[0])
     }

     useEffect(() => {
        getC()
    }, [])

    const getC = () => {
        axiosClient.get('/carts')
            .then(({ data }) => {

                setCarts(data)
                //  setNavig(true);

            })
            .catch(err => {
                setLoading(true)
                const response = err.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    const onSubmit = (ev) =>{
        ev.preventDefault()

        const formData = new FormData()
        formData.append('image',images)
        formData.append('description',descriptionRef.current.value)
         formData.append('price',prixRef.current.value)
         formData.append('category_id',document.getElementById("cart_id").value)
         formData.append('name',nameRef.current.value)

        axiosClient.post('/create', formData)
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
            <h2>Add New Product</h2>
            {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <form id={styles.form345} className={`${styles.flex34} ${styles.flexcol7}`} enctype="multipart/form-data" >
             <input ref={nameRef} type="text" placeholder="name" />
             <input ref={descriptionRef} type="text"  />
             <input ref={prixRef} type="text"  />
<select name="cart_id" id="cart_id">
    {carts.map(cart => (
        <option value={cart.id}>{cart.title}</option>
    ))}
</select>
             <input  type="file" onChange={handleImage} />
             <button onClick={onSubmit} className={styles.btn}>Add new Product</button>
            </form>
         </div>
         <div className={styles.col2}>
            <img src={img1} alt="a header image" />
         </div>
        </div>
    </section>
  );
};

export default Form; // Exporting the corrected Card component
