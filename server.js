const express = require("express");
const app = express();
// This is a sample test API key.
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use(express.static("public"));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

//app.use(express.json());

const cors = require("cors");

app.use(
  cors()
  //"https://ecommerce-amazon-clone.herokuapp.com/", //"https://clone-3ca94.web.app/", //origin: "http://localhost:4242",//origin: "http://localhost:5500",
);

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body.items;
  //console.log("these are items >>> ", items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.price, //req.body.price * 100, //req.body.price,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

  //console.error("this is error >>> ", e.error);
});

//app.listen(process.env.PORT || 4242);
app.listen(process.env.PORT || 4242, () =>
  console.log(`Node server listening on port ${process.env.PORT}!`)
);
