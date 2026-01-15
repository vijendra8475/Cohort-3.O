const express = require('express')
const app =  express();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

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