const { Router } = require('express');
const { adminModel, courseModel } = require('../DB/models');
const bcrypt = require('bcrypt')
const router = Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { adminMiddleware } = require('../middlewares/admin.middlewares');

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
    console.log(email, password);

    const user = await adminModel.findOne({ email })

    if(!user)
        return res.status(403).json({ message : 'Invalid credentials'})

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect)
        return res.status(403).json({ message : 'Invalid Credentials'})

    const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET_FOR_ADMIN);


    res.json({
        message : 'signin route',
        token
    })
})

router.post('/course', adminMiddleware, async (req, res) => {

    const { title, description, imageUrl, price } = req.body

    await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId : req.adminId
    })
    
    res.json({
        message : 'course craetion'
    })
})

router.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.adminId

    const { title, description, imageUrl, price, courseId } = req.body;

    try{
        await courseModel.updateOne({
            _id : courseId,
            creatorId : adminId
        }, {
            title,
            description,
            imageUrl,
            price
        })

        res.status(200).json({
            message : 'Course updated'
        })
    }
    catch {
        res.json({
            message : 'something went wrong while updating course'
        })
    }

    
})


router.get('/course/bulk', adminMiddleware, async(req, res) => {

    const { adminId } = req;

    const courses = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        message : 'Admin all courses',
        courses
    })
})


module.exports = router