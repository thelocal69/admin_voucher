import React from 'react'
import { Navigate } from 'react-router-dom';


const PrivateRoutes = ({ Component }) => {

    const auth = localStorage.getItem("token");
    return auth ? <Component /> : <Navigate to="/" />
}

export default PrivateRoutes