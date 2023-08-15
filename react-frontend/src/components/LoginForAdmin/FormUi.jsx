import React,{useRef} from "react";


import img1 from "../../assets/img/pexels-markus-spiske-1343537.jpg";
import styles from './Form.module.css';
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbarforadmin from '../NavbarForadmin/NavbarFor';

import {useState} from "react";


const Form = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();
    // const [navig, setNavig] = useState(false);

    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload ={
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/admin/login', payload)
        .then(({data})=>{
             setUser(data.user)
             setToken(data.token)
             console.log(data);
            //  setNavig(true);
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
    <>
    <Navbarforadmin/>
    <section className={styles.FormFor}>
        <div className={styles.register}>
         <div className={styles.col1}>
            <h2>Sign In</h2>
            {errors && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <form id={styles.form345} className={`${styles.flex34} ${styles.flexcol7}`} onSubmit={onSubmit}>
             <input ref={emailRef} type="email" placeholder="Email" />
             <input  ref={passwordRef} type="text" placeholder="Password" />

             <button className={styles.btn}>Sign In</button>

            </form>
         </div>
         <div className={styles.col2}>
            <img src={img1} alt="a header image" />
         </div>
        </div>
    </section>
    </>
  );
};

export default Form; // Exporting the corrected Card component
