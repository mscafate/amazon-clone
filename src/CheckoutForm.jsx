import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { getBasketTotal } from "./reducer";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import './CheckoutForm.css'

export default function CheckoutForm(clientSecret) {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);

  
  useEffect(async () => {
    console.log('CheckoutForm.jsx useEffect!!!')
    if (!stripe) {
      return;
    }
    /*
    clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    */
    console.log('client secret >>> ', clientSecret.clientSecret)
      
    if (!clientSecret) {
      return;
    }

    try{
      console.log('client secret >>> ', clientSecret)
    stripe.retrievePaymentIntent(clientSecret.clientSecret).then(({ paymentIntent }) => {
      console.log('payment intent >>> ', paymentIntent)
      switch (paymentIntent.status) {
        case "succeeded":
          
          console.log('checkout form >>> success!!!')
          db.collection("users")
          .doc(user?.uid) //id or uid?
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
          
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  } catch (e) {
    
    console.log('error retrieve payment intent >>> ', e.error)
  }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    /*
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/orders",
      },
    });
    */

    const payload = await stripe.confirmCardPayment(clientSecret.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    .then(({ paymentIntent }) => {
      //paymentIntent = payment confirmation
      //order history
      db.collection("users")
        .doc(user?.uid) //id or uid?
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: "EMPTY_BASKET",
      });

      history.replace("/orders");
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage('card error or validation error', error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
    {/*
    <form id="payment-form" onSubmit={handleSubmit}>
      
      <PaymentElement id="payment-element" />
      Show any error or success messages 
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      
      <CardElement onChange={handleChange} />
       
      {message && <div id="payment-message">{message}</div>}
    </form>
    */}
    
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment section - delivery address*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__title">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Stuff */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}