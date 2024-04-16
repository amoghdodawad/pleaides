import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/userSlice';

function Comp1() {
    const name = useRef('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className='comp1'>
            <div className='name'>
                <input type='text' ref={name} onChange={(event) => {
                    // dispatch(setName(event.target.value));
                    console.log(name.current.value);
                }}/>
            </div>
            <div className='nav' onClick={() => {
                dispatch(setName(name.current.value));
                navigate('/2');
            }}>
                Click here to go to comp2 page
            </div>
        </div>
    )
}

export default Comp1