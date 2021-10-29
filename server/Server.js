const express = require("express");
const app = express();
// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.listen(4242, () => console.log("Node server listening on port 4242!"));
