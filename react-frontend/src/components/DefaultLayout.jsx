import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Navbar from './NavbarFor/NavbarFor';
import Form from './Form/FormUi';
import Show from './showProduct/showProduct';

export default function DefaultLayout() {
    // const {user, token} = useStateContext()

    // if(!token){
    //     return <Navigate to="/login"/>
    // }
  return (
    <>
<div className="d-flex flex-column justify-content-between align-items-center vh-100 px-3">
<Navbar/>
<Outlet/>
</div>
</>
  )
}
