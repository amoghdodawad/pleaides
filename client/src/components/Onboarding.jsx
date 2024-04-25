import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './Onboarding.css';
import { setContactNumber } from '../redux/userSlice';

function Onboarding() {
    const { email, token, isRegistered, contactNumber } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const collegeRef = useRef('');
    const semRef = useRef('');
    const phoneRef = useRef('');
    const genderRef = useRef('');

    if(contactNumber && !isRegistered){
        return <Navigate to='/payment' replace/>
    }

    if(contactNumber){
        return <Navigate to='/' replace/>
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if(semRef.current.value < 1 || semRef.current.value > 10) {
            alert(`Semester value should be between 1 and 10`);
            return;
        }
        if(phoneRef.current.value?.length !== 10){
            alert('Please enter the right phone number');
            return;
        }
        if(genderRef.current.value === 'select'){
            alert('Please select the gender');
            return;
        }
        try {
            const data = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    college: collegeRef.current.value,
                    semester: semRef.current.value,
                    contactNumber: phoneRef.current.value,
                    gender: genderRef.current.value
                })
            });
            dispatch(setContactNumber(phoneRef.current.value));
            alert('Details updated successfully');
            navigate('/payment');
        } catch (error) {
            alert('Some error occured');
        }
        
    }

    return (
        <div className='onboarding-container'>
            <div>
                Please enter your details.
            </div>
            <form action="" className='onboarding-form' onSubmit={handleSubmit}>
                <input required type="text" placeholder='College' ref={collegeRef}/>
                <input required type="number" placeholder='Semester' ref={semRef}/>
                <input required type="text" placeholder='Phone number' ref={phoneRef}/>
                <select required name="gender" id="" ref={genderRef}>
                    <option value="select">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Onboarding