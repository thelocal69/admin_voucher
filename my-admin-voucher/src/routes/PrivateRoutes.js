import React from 'react'
import { Navigate } from 'react-router-dom';
import Store from '../redux/store';


const PrivateRoutes = ({ Component }) => {

    const auth = Store.getState().auth.accessToken;
    return auth ? <Component /> : <Navigate to="/" />
}

export default PrivateRoutes