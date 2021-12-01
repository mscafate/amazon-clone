import React from "react";
import { useStateValue } from "./StateProvider";
import { getBasketTotal, stripePrice, basketPrice } from "./reducer";
import "./StripeCheckout.css";
import { Link } from "react-router-dom";

function StripeCheckout() {
  const [{ basket, user }, dispatch] = useStateValue();

  async function Pay() {
    stripePrice(basket);
    if (user != null) {
      await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: getBasketTotal(),
          items: basket.map(),
        }),
      })
        .then((res) => {
          console.log("this is response", res);
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          console.log("this is it", url);
          window.location = url;
        })
        .catch((e) => {
          console.log(e.error);
        });
    } else {
      console.log("no user!!");
      window.location = "http://localhost:3001/login"; // <<< change <<<
    }
    basketPrice(basket);
  }

  return (
    <div>
      <button className="checkout__button" onClick={Pay}>
        Checkout
      </button>
    </div>
  );
}

export default StripeCheckout;
