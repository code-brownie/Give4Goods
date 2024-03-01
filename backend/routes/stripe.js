require('dotenv').config();
const express = require('express');
const router = express.Router();
const Stripe = require('stripe')(process.env.REACT_APP_PRIVATE_KEY);

router.post('/stripe', async (req, res) => {
  const data = req.body;

  try {
    const lineItems = await Promise.all(
      data.map(async (item) => {
        return {
          price_data: {
            currency: 'INR',
            product_data: {
              name: item.name.toUpperCase(),
            },
            unit_amount: item.price * 100,
          },
          quantity: item.Qty,
        };
      })
    );

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'https://give4-goods.vercel.app/products',
      // success_url: 'http://localhost:3000/products',
      cancel_url: 'https://give4-goods.vercel.app/cart',
    });

    res.json({ url: session.url, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
