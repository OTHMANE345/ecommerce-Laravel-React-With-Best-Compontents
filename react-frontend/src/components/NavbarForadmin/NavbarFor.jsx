import React from "react";
import './NavbarFor.css';
import { Link } from "react-router-dom";
// import { FcAddressBook } from "react-icons/fc";
import { useStateContext } from "../../contexts/ContextProvider";

import axiosClient from "../../axios-client";

const NavBarFor = () => {

    const {user, token} = useStateContext()
    const {setUser, setToken} = useStateContext();

   
  return (

  <div className="n-wrapper">
    <div className="n-left">
        <div className="n-name">Othmane</div>

    </div>
    <div className="n-right">
        <div className="n-list" >
            <ul style={{listStyleType:'none'}}>
                <li ><Link to="/admin/login" className="nav-link-for-admin">login</Link></li>





            </ul>
        </div>
    </div>
  </div>
  );
};

export default NavBarFor                  ; // Exporting the corrected Card component
