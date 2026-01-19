const { Router } = require('express');
const { purchaseModel } = require('../DB/models');
const { userMiddleware } = require('../middlewares/user.middlewares');
const router = Router();


router.post('/purchase', userMiddleware, async (req, res) => {

    const { userId } = req;
    const { courseId } = req.body;
    
    if(!userId || !courseId)
        return res.status(400).json({ message : "All feilds required" })

    try {

        await purchaseModel.create({
            userId,
            courseId
        })

        res.status(200).json({ message : "course purchased" })
    } catch (error) {
        res.status(400).json({ message : "something went wrong while purchasing course", error });
    }
})

router.get('/preview', (req, res) => {

    res.json({
        message : "preview a course"
    })
})


module.exports = router;