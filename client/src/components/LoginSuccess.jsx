import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail, setName, setUser, setToken } from '../redux/userSlice';

function LoginSuccess() {
    const token = useSearchParams()[0].get('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if(token){
            // localStorage.setItem('tempToken',token);
            // console.log(navigate);
            // navigate('/');
        }
        async function getDetails(){
          try {
            const res = await fetch('https://home.amoghasdodawad.dev/auth/login/success?token='+token);
            const data = await res.json();
            const { email } = data.user;
            const newToken = data.token;
            // dispatch(setEmail(email));
            // dispatch(setName(name));
            // console.log(newToken);
            if(res.status === 200){
              const userFetch = await fetch('https://home.amoghasdodawad.dev/api/user/'+email);
              const userData = await userFetch.json();
              dispatch(setUser({...userData.data, token: newToken}));
              // console.log({ ...userData.data, token: newToken });
            }
            navigate('/');
          } catch (err) {
            console.log(err);
          }        
        }
        getDetails();
    },[])
    // console.log(token);
  return (
    <div>LoginSuccess</div>
  )
}

export default LoginSuccess