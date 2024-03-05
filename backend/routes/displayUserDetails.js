const express = require('express');
const router = express.Router();

router.post('/userDt', async (req, res) => {
    try {
        res.send([global.userDetails])
        // console.log(global.userDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;