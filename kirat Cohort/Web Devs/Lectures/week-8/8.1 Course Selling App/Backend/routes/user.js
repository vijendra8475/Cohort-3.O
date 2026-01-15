const { Router } = require('express')
const { userModel } = require('../DB/models')
const bcrypt = require('bcrypt')
const router = Router();

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

router.post('/signin', (req, res) => {
    res.json({
        message : 'signin route'
    })
})

router.get('/purchases', (req, res) => {
    res.json({
        message : 'getting all purchased courses'
    })
})


module.exports = router