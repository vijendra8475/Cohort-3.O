const { Router } = require('express')
const router = Router();

router.post('/signup', (req, res) => {
    res.json({
        message : 'signup route'
    })
})

router.post('/signin', (req, res) => {
    res.json({
        message : 'signin route'
    })
})

router.post('/course', (req, res) => {
    res.json({
        message : 'course craetion'
    })
})


router.post('/course/bulk', (req, res) => {
    res.json({
        message : 'course / bulk'
    })
})


module.exports = router