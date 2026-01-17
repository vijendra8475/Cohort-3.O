const { Router } = require('express')
const { userModel } = require('../DB/models')
const bcrypt = require('bcrypt')
const router = Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signup', async (req, res) => {

    const { email, password, firstName, lastName } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        userModel.create({
            email,
            password : hashedPassword,
            firstName,
            lastName
        })

        res.json({
            message : 'signup success'
        })
    }
    catch(e) {
        res.json({
            message : 'Something went wrong at signup route'
        })
    }
})

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if(!user)
        return res.status(403).json({ message : 'Invalid credentials'})

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if(!isPasswordCorrect)
        return res.status(403).json({ message : 'Invalid Credentials'})

    const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET);


    res.json({
        message : 'signin route',
        token
    })
})

router.get('/purchases', (req, res) => {
    res.json({
        message : 'getting all purchased courses'
    })
})


module.exports = router