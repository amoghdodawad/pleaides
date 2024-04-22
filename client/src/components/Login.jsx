import React from 'react';
import './Login.css';

function Login() {
    function google(){
        window.open('https://home.amoghasdodawad.dev/auth/google/','_self')
    }
    return (
        <div className='login-container'>
            <div>
                Login page
            </div>
            <div className='google-container'>
                <div onClick={google} className='google-button'>
                    Sign up/Login with Google
                </div>
            </div>
        </div>
    )
}

export default Login