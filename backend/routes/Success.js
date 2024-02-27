const express = require('express');
const router = express.Router();

router.get('/processed', (req, res) => {
  // Redirect back to the cart page with the success message as a query parameter
  res.redirect('/cart?success=true&message=Payment+Successful!+Thank+you+for+your+purchase');
});

module.exports = router;

