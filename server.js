const express = require("express");
const app = express();
// This is a sample test API key.
const stripe = require("stripe")(
  "sk_test_51JcHJpFVhnNedSqNrcMrHi81GXV55ALNXuS2e1Qf81K0FwshrOILDOfgHi7x2sNB0ScRpOJXXTguCG7eCfu1KJZc00TuFs9FXO"
);
const endpointSecret = "whsec_ZRJMG3CCb2EwV0ICOBxa1xHOUQBEWH8W";

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
  cors({
    origin: "https://clone-3ca94.web.app/", //origin: "http://localhost:4242",//origin: "http://localhost:5500",
  })
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  //items?.reduce((amount, item) => item.price + amount, 0);
  return 1400;
};

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
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event; // = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    //let paymentIntent;
    switch (event.type) {
      case "payment_intent.succeeded":
        const payment = event.data.object;
        console.log(`PaymentIntent for ${payment.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      case "charge.succeeded":
        const charge = event.data.object;
        // Then define and call a function to handle the event charge.succeeded
        console.log(`Charge for ${charge.amount} was successful!`);
        //response.send({ charge });
        console.log("this is charge", charge);
        break;
      case "payment_intent.created":
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        console.log(`PaymentIntent for ${paymentIntent.amount} was created!`);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(process.env.PORT || 4242);
//app.listen(4242, () => console.log("Node server listening on port 4242!"));
