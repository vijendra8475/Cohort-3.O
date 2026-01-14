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

router.get('/purchases', (req, res) => {
    res.json({
        message : 'getting all purchased courses'
    })
})


module.exports = router