import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order.js";
import axios from "axios";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  useEffect(async () => {
    const product = urlParams.get("redirect_status");
    console.log("URL params >>>", product);
    if (product === "succeeded") {
      console.log(basket);
    }
  }, []);

  /*
  useEffect(async () => {
    await axios("http://localhost:4242/webhook", {})
      //.then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          console.log("this is response", res.payment);
          //return res.json();
        } else {
          //return res.json().then((json) => Promise.reject(json));
          console.log("failed this is response", res.payment);
        }
      })
      .then((data) => {
        //setClientSecret(data.clientSecret)
      })
      .catch((e) => {
        console.log(e.error);
      });
  }, []);
  */

  useEffect(() => {
    if (user) {
      console.log("orders here");
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
