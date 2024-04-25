import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setName, setUser, setToken } from '../redux/userSlice';

function LoginSuccess() {
    const token = useSearchParams()[0].get('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        async function getDetails(){
          try {
            const res = await fetch('/auth/login/success?token='+token);
            const data = await res.json();
            const { email } = data.user;
            const newToken = data.token;
            if(res.status === 200){
              const userFetch = await fetch('/api/user/'+'email',{
                headers: {
                  'Authorization': `Bearer ${newToken}`
                }
              });
              const userData = await userFetch.json();
              const { isRegistered, contactNumber, college } = userData.data;
              dispatch(setUser({...userData.data, token: newToken}));
              if(contactNumber && !isRegistered) navigate('/payment',{ replace: true });
              else if(!isRegistered) navigate('/onboarding',{ replace: true });
              else navigate('/',{ replace: true });
            }
          } catch (err) {
            console.log(err);
          }        
        }
        getDetails();
    },[])
  return (
    <div>LoginSuccess</div>
  )
}

export default LoginSuccess