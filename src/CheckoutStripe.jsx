import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateProvider";
import { getBasketTotal, stripePrice, basketPrice } from "./reducer";
import './CheckoutStripe.css'

import Payment from "./Payment";
//import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_51JcHJpFVhnNedSqNMqqGVnFi6KuAq2wJBnbm1qHxA9H7wdknHYpyRfhGLJWdPS2PWwBJGlikYATmAYhhVFOglS6n00GeOb57J1");

export default function CheckoutStripe() {
  const [clientSecret, setClientSecret] = useState("");
  const [{ basket, user, }] = useStateValue();
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(async () => {
    console.log('basket >>> ', basket);
    console.log('price', getBasketTotal(basket))
    console.log('should be false', isLoading)
    // Create PaymentIntent as soon as the page loads
    if (user != null) {
      setIsLoading(true)
      setMessage('loading server from heroku please wait...')
      console.log('should be true', isLoading)


      
    await fetch('https://ecommerce-amazon-clone-server.herokuapp.com/create-payment-intent', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: basket,
        price: getBasketTotal(basket) * 100//[{ id: "xl-tshirt" }]
        //price: getBasketTotal(basket),
      //}),//JSON.stringify({
        //price: getBasketTotal(),
        //items: basket,
      }),
    })
      //.then((res) => res.json())
      .then((res) => {
        setIsLoading('')
        setMessage('Please use 4242... (repeated) to fill out payment information.')
        if (res.ok) {
          console.log("this is response", res);
          return res.json();
        } else {
        return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((e) => {
        console.log(e.error);
      });
    } else {
      console.log("no user!!");
      window.location = "/login"; // <<< change <<<
    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <div className='body'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Payment clientSecret={clientSecret}/>
        </Elements>
      )}
      </div>
      <div className='payment__footer'>
        {message}
      </div>
    </div>
  );
}