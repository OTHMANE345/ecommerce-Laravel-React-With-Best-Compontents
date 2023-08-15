import React,{useRef} from "react";
import img1 from "../../assets/img/pexels-markus-spiske-1343537.jpg";
import styles from './Form.module.css';
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import Navbarforadmin from '../NavbarForadmin/NavbarFor';


const FormForSinUp = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();
    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload ={
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/singup', payload)
        .then(({data})=>{
             setUser(data.user)
             setToken(data.token)

        })
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            setErrors(response.data.errors)
        }
    })  }
  return (
    <>
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
            <span>register and enjoy the service</span>
            <form id={styles.form345} className={`${styles.flex34} ${styles.flexcol7}`} onSubmit={onSubmit}>
            <input ref={nameRef} type="text" placeholder="Name" />
            <input ref={emailRef} type="email" placeholder="Email" />
             <input  ref={passwordRef} type="text" placeholder="Password" />

             <button className={styles.btn}>Sign In</button>
             <div className="alert alert-dark" role="alert">

                 Not Registered ? <Link to="/">Create an account</Link>
                </div>
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

export default FormForSinUp; // Exporting the corrected Card component
