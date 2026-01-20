const { Router } = require('express')
const { userModel, purchaseModel } = require('../DB/models')
const bcrypt = require('bcrypt')
const router = Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { userMiddleware } = require('../middlewares/user.middlewares');

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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(password, "   ", user.password, '   ', isPasswordCorrect);
    

    if(!isPasswordCorrect)
        return res.status(403).json({ message : 'Invalid Credentials'})

    const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET);

    res.json({
        message : 'signin route',
        token
    })
})

router.get('/purchases', userMiddleware, async (req, res) => {

    const { userId } = req;

    try{
        const courses = await purchaseModel.find({
            userId
        })

        if(courses.length === 0)
            return res.status(201).json({ message : "You not purchase any course" });

        res.status(200).json({ message : "request success", courses });
    }
    catch {
        res.status(400).json({ message : "something went wrong" })
    }
})


module.exports = router