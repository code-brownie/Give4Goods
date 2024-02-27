require('dotenv').config();
const shorturl = require('shorturl');
const express = require('express');
const router = express.Router();
const Stripe = require('stripe')(process.env.REACT_APP_PRIVATE_KEY);
console.log(process.env.REACT_APP_MONGO_URI)

router.post('/stripe', async (req, res) => {
  const data = req.body;
  try {
    const lineItems = await Promise.all(
      data.map(async (item) => {
        const shortenedUrl = await shorturl(item.img);
        return {
          price_data: {
            currency: 'INR',
            product_data: {
              name: item.name.toUpperCase(),
              images: [shortenedUrl],
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
      success_url: 'https://give4-goods.vercel.app/api/auth/processed',
      cancel_url: 'https://give4-goods.vercel.app/cancel',
    });

    res.json({ url: session.url, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
