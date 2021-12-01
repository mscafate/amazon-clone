import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "./StateProvider";
import { getBasketTotal, stripePrice, basketPrice } from "./reducer";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_51JcHJpFVhnNedSqNMqqGVnFi6KuAq2wJBnbm1qHxA9H7wdknHYpyRfhGLJWdPS2PWwBJGlikYATmAYhhVFOglS6n00GeOb57J1");

export default function CheckoutStripe() {
  const [clientSecret, setClientSecret] = useState("");
  const [{ basket, user, }] = useStateValue();

  useEffect(async () => {
    console.log('basket >>> ', basket);
    console.log('price', getBasketTotal(basket))
    // Create PaymentIntent as soon as the page loads
    await fetch('/create-payment-intent', {
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
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}