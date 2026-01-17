const { Router } = require('express')
const router = Router();


router.get('/purchase', (req, res) => {
    res.json({
        message : "getting all courses"
    })
})

router.get('/preview', (req, res) => {
    res.json({
        message : "preview a course"
    })
})


module.exports = router;