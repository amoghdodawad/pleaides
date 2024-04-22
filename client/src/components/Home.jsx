import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {
    const { name } = useSelector(store => store.user);
    function logOut(){
        localStorage.clear();
        window.location.href = '/'
    }
    return (
        <div className='home'>
            <div>
                <Link to={`/login`}>Login</Link>
            </div>
            <div>
                {name ? name : ''}
            </div>
            <div onClick={logOut}>
                Logout
            </div>
        </div>
    )
}

export default Home