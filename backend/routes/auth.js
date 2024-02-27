const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRECT = "code_aman$";
const fetchuser = require('../middleware/fetchUser');

//Register a user using Post "/api/auth".
router.post('/register', [body('name', 'Enter a valid Name').isLength({ min: 5 }),
body('email', "Enter a Valid Email").isEmail(),
body('password', 'Password should be min of 5 character').isLength({ min: 5 })],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() })
        }

        //   checking weather the Email already exits
        try {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'sorry a user with this email already exists' });
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRECT);
            // console.log(authToken);
            res.json({ authToken: authToken, success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error occured");
        }

    })
// Registeration ends here

// Login Starts here


router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', 'Password cannot be blank').exists(),],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() })
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: 'Incorrect Credentials' });
            }

            const passwordCompared = await bcrypt.compare(password, user.password);
            if (!passwordCompared)
                return res.status(400).send({ error: "Please Login with correct credentials" })
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRECT);
            res.json({ authToken: authToken, success: true });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error occured");
        }
    });

router.post('/getuser', fetchuser, async (req, res) => {
    try {

        let userId = req.user.id;

        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }


});

module.exports = router;