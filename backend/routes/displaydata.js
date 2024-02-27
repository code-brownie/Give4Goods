const express = require('express');
const router = express.Router();

router.post('/productItems', async (req, res) => {
    try {
        res.send([global.shop_items])
        // console.log(global.shop_items);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }

})
module.exports = router;