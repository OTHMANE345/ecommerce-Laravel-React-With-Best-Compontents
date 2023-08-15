import React from "react";
import './NavbarFor.css';
import { Link, useNavigate } from "react-router-dom";
// import { FcAddressBook } from "react-icons/fc";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

const NavBarFor = () => {
const {user, token} = useStateContext()
const navigate = useNavigate();
const {setUser, setToken} = useStateContext();

const logout = (ev) =>{
    ev.preventDefault()
    const payload ={

        user_id:user.id,


    }
    axiosClient.post('/logout', payload)
    .then(({data})=>{
         setUser({})
         setToken(null)
        localStorage.removeItem('ACCESS_TOKEN')
        navigate('/login')
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
<>
  <div className="n-wrapper">
    <div className="n-left">
        <div className="n-name">Othmane</div>

    </div>
    <div className="n-right">
        <div className="n-list" >
            <ul style={{listStyleType:'none'}}>
               {!token && (
                <li><Link to="/login" className="nav-link-for-admin" id="cart-link3">login</Link></li>

             )}
              {!token && (
                <li><Link to="/singup" className="nav-link-for-admin" id="cart-link2">sign_in</Link></li>

             )}
                {token && (
                <li><Link to="/carts" className="nav-link-for-admin" id="cart-link">carts</Link></li>
               )}
               {token && (
                <li><Link to="/login" className="nav-link-for-admin" id="cart-link" onClick={logout}>log out</Link></li>
               )}

{!token && (    <li ><Link to="/admin/login" className="nav-link-for-admin">login_admin</Link></li>
  )}
            </ul>
            </div>

    </div>
  </div>
  </>
  );
};

export default NavBarFor                  ; // Exporting the corrected Card component
