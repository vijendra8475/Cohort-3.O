const { Router } = require('express');
const { adminModel } = require('../DB/models');
const bcrypt = require('bcrypt')
const router = Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            await adminModel.create({
                email,
                password : hashedPassword,
                firstName,
                lastName
            })
    
            res.json({
                message : 'Admin signup success'
            })
        }
        catch(e) {
            res.json({
                message : 'Something went wrong at signup route',
            })
        }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await adminModel.findOne({ email })

    if(!user)
        return res.status(403).json({ message : 'Invalid credentials'})

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if(!isPasswordCorrect)
        return res.status(403).json({ message : 'Invalid Credentials'})

    const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET_FOR_ADMIN);


    res.json({
        message : 'signin route',
        token
    })
})

router.post('/course', (req, res) => {
    res.json({
        message : 'course craetion'
    })
})

router.put('/course', (req, res) => {
    res.json({
        message : 'course craetion'
    })
})


router.get('/course/bulk', (req, res) => {
    res.json({
        message : 'course / bulk'
    })
})


module.exports = router