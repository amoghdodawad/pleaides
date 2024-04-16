import React from 'react';
import { useSelector } from 'react-redux';

function Comp2() {
    const user = useSelector(store => store.user);
    console.log(user);
    if(!user) return;
    return (
        <div className='comp2'>
            <div className='comp2-name'>
                {user.name}
            </div>
        </div>
    )
}

export default Comp2