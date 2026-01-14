const express = require('express')
const app =  express();
const jwt = require('jsonwebtoken')

const userRouter = require('./routes/user')
const courseRouter = require('./routes/courses')

app.use(express.json());

app.use('/user', userRouter);
app.use('/courses', courseRouter);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})