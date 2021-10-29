import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Search from "./Search";
import Client from "./Client";

const promise = loadStripe(
  "pk_test_51JcHJpFVhnNedSqNMqqGVnFi6KuAq2wJBnbm1qHxA9H7wdknHYpyRfhGLJWdPS2PWwBJGlikYATmAYhhVFOglS6n00GeOb57J1"
);

function App() {
  const [{ menu }, dispatch] = useStateValue();

  function addToMenu(products) {
    console.log("products:", products);
    products?.map((product) => {
      console.log("add to Menu: ", product);
      dispatch({
        type: "ADD_TO_MENU",
        item: {
          id: product.id,
          key: product.id,
          title: product.data.title,
          image: product.data.image,
          price: product.data.price,
          rating: product.data.rating,
        },
      });
    });
  }

  useEffect(() => {
    console.log("this is db >>>", db);
    db.collection("products").onSnapshot((snapshot) => {
      const products = snapshot.docs.map((doc) => {
        console.log("this is doc >>", doc);
        return {
          id: doc.id,
          data: doc.data(),
        };
      });

      addToMenu(products);
      console.log("App useEffect(): ", products);
      console.log("App Menu: ", menu);
    });
  }, []);

  useEffect(() => {
    //will only run once...
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM

    <Router>
      <div className="app">
        <Switch>
          <Route path="/search">
            <Header />
            <Search />
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />

            <Elements stripe={promise}>
              <Payment />
              {/*<Client />*/}
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
