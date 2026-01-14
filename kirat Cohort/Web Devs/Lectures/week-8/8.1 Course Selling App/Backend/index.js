const express = require('express')
const app =  express();
const jwt = require('jsonwebtoken')

app.use(express.json());

app.post('/user/signup', (req, res) => {
    res.json({
        message : 'signup route'
    })
})

app.post('/user/signin', (req, res) => {
    res.json({
        message : 'signin route'
    })
})

app.get('/user/purchases', (req, res) => {
    res.json({
        message : 'getting all purchased courses'
    })
})

app.get('/courses', (req, res) => {
    res.json({
        message : "getting all courses"
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})