const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: "Payment failed" });
  }
};
