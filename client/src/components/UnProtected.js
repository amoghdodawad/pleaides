import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function UnProtected({ children, next }) {
    const { isRegistered, contactNumber, token } = useSelector(store => store.user);

    if(next === 'login' && token && !contactNumber){
        return <Navigate to='/onboarding' replace/>
    }

    if(next === 'login' && token && !isRegistered){
        return <Navigate to='/payment' replace/>
    }

    if(token){
        return <Navigate to='/' replace/>
    }

    return (
        children
    );
}

export default UnProtected;