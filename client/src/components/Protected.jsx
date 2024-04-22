import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Protected({ children, next }) {
    const { token } = useSelector(store => store.user);

    if(!token){
        return <Navigate to={{ pathname: '/login' }} replace/>
    }

    return (
        children
    );
}

export default Protected;