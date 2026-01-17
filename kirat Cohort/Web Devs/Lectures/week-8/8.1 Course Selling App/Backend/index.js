const express = require('express')
const app =  express();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const  { userModel, adminModel, purchaseModel, courseModel } = require('./DB/models')
const connect = require('./DB/db')

app.use(express.json())

dotenv.config();
connect();

const PORT = process.env.PORT

const userRouter = require('./routes/user')
const courseRouter = require('./routes/courses')
const adminRouter = require('./routes/admin')

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/admin', adminRouter)

app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
})