require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001", //origin: "http://localhost:5500",
  })
);

app.post("/create-checkout-session", async (req, res) => {
  //try {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: req.body.items.map((item) => {
      console.log("this is item>>>", item);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price,
        },
        quantity: 1,
      };
    }),
    success_url: `${process.env.CLIENT_URL}orders`,
    cancel_url: `${process.env.CLIENT_URL}orders`, //payment
  });
  res.json({ url: session.url });
  //} catch (e) {
  res.status(500).json({ error: e.message });
  //}
  if (session) {
    if (session.payment_status === "paid") {
      console.log("paid!!!!!!!!");
    }
  }
});

app.listen(3000);
