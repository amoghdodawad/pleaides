import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Payment.css';
import { setRegistered } from '../redux/userSlice';
import img from './pleiadesBlack.png'
import { Navigate, useNavigate } from 'react-router-dom';

function Payment() {
    const { email, isKle, token, isRegistered } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(isRegistered){
        return <Navigate to='/'/>
    }
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(pkg = 0) {
        const temp = {
            email: 'email'
        };
        if(pkg !== 0) temp.pkg = pkg;
        try {
            const result = await axios.post("/api/orders/register",temp, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
            if(result.status !== 200){
                console.log('Some error');
                return;
            }
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: "rzp_test_xUeR6QGk0YyHI9", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "Pleaides",
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                    if(response.razorpay_signature) {
                        dispatch(setRegistered());
                    }
                    navigate('/');
                    // const data = {
                    //     orderCreationId: order_id,
                    //     razorpayPaymentId: response.razorpay_payment_id,
                    //     razorpayOrderId: response.razorpay_order_id,
                    //     razorpaySignature: response.razorpay_signature,
                    // };


                    // const result = await axios.post("http://localhost:5000/payment/success", data);

                    // alert(result.data.msg);
                },
                // prefill: {
                //     name: "Amogh Dodawad",
                //     email: "amoghasdodawadddd@gmail.com",
                //     kleId: 'KLEPLEAMO1880',
                //     contact: "8147078932",
                // },
                notes: {
                    address: "Amogh Dodawad Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='payment-container'>
            <p>Buy package now!</p>
            {isKle && 
                <div className='non-kle-container'>
                    <div className='non-kle-card'>
                    <div className='image-container'>
                            <img src={img} alt="" />
                        </div>
                        <div className='perks-container'>
                            <ul>
                                <li>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, excepturi.
                                </li>
                                <li>
                                    Item 2
                                </li>
                                <li>
                                    Item 3
                                </li>
                                <li>
                                    Item 4
                                </li>
                                <li>
                                    Item 5
                                </li>
                                <li>
                                    Item 6
                                </li>
                                <li>
                                    Item 7
                                </li>
                            </ul>
                        </div>
                        <div className='payment-button' onClick={() => displayRazorpay(0)}>
                            500
                        </div>
                    </div>
                </div>
            }
            {!isKle && 
                <div className='non-kle-container'>
                    <div className='non-kle-card' onClick={() => displayRazorpay(1)}>
                        <div className='image-container'>
                            <img src={img} alt="" />
                        </div>
                        <div className='perks-container'>
                            <ul>
                                <li>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, excepturi.
                                </li>
                                <li>
                                    Item 2
                                </li>
                                <li>
                                    Item 3
                                </li>
                                <li>
                                    Item 4
                                </li>
                                <li>
                                    Item 5
                                </li>
                                <li>
                                    Item 6
                                </li>
                                <li>
                                    Item 7
                                </li>
                            </ul>
                        </div>
                        <div className='payment-button'>
                            2500
                        </div>
                    </div>
                    <div className='non-kle-card' onClick={() => displayRazorpay(2)}>
                        <div className='image-container'>
                            <img src={img} alt="" />
                        </div>
                        <div className='perks-container'>
                            <ul>
                                <li>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, excepturi.
                                </li>
                                <li>
                                    Item 2
                                </li>
                                <li>
                                    Item 3
                                </li>
                                <li>
                                    Item 4
                                </li>
                                <li>
                                    Item 5
                                </li>
                                <li>
                                    Item 6
                                </li>
                                <li>
                                    Item 7
                                </li>
                            </ul>
                        </div>
                        <div className='payment-button'>
                            3500
                        </div>
                    </div>
                </div>
            }
            <div className='skip' onClick={() => navigate('/')}>
                Skip for now
            </div>
        </div>
    )
};

export default Payment;
