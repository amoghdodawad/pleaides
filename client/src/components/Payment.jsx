import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';


function Payment() {
    // const dispatch = useDispatch();
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

    async function displayRazorpay() {

        const result = await axios.post("https://home.amoghasdodawad.dev/api/orders/register",{
            email: 'amoghasdodawad@gmail.com'
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        if(result.status !== 200){
            console.log('Some error');
            return;
        }
        console.log(result);
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
                console.log(response);
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };


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
    }
    return (
        <div>
            <p>Buy React now!</p>
            <button className="App-link" onClick={displayRazorpay}>
                Pay ₹500
            </button>
        </div>
    )
};

export default Payment;
