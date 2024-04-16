import React from 'react'

function Login() {
    function google(){
        window.open('https://home.amoghasdodawad.dev/auth/google/','_self')
    }
    return (
        <div>
            <div>
                Login page
            </div>
            <div>
                <div onClick={google}>
                    Google
                </div>
            </div>
        </div>
    )
}

export default Login