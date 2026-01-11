const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const { UserModel, TodoModel} = require('./db/models')
const { auth, JWT_SECRET} = require('./auth/auth')
const bcrypt = require('bcrypt')

mongoose.connect("mongodb+srv://privatexyz2:privatexyz2@asys.jluk7qw.mongodb.net/todo-app")

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

    try {
        const { name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            name, email, password : hashedPassword
        })

        res.json({ message : 'you are signed in'})
    }
    catch(e) {
        return res.status(400).json({ message : 'Error while signing up'})
    }

});


app.post("/signin", async function(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();

    const user = await UserModel.findOne({
        email
    })
    console.log(user);

    if(!user)
        return res.status(403).json({ message : 'user not found'})

    const isPasswordValid = bcrypt.compare(password, user.password)
    
    if(!isPasswordValid)
        return res.status(403).json({ message : 'invalid password'})

    const token = jwt.sign({ id : user._id.toString() }, JWT_SECRET);
    return res.status(200).json({ message : 'signin successfully', token})
});


app.post("/todo", auth, async function(req, res) {
    const { userId } = req;
    const { title, done } = req.body;

    await TodoModel.create({
        userId,
        title,
        done
    })

    res.status(200).json({ message : 'Task added'})

});


app.get("/todos", auth, async function(req, res) {
    const { userId } = req;

    const tasks = await TodoModel.find({ userId }).populate('userId').exec();

    if(tasks.length === 0)
        return res.status(201).json({ message : 'Task list is empty'})

    return res.status(200).json({ message : "here is task...", tasks})
});

app.listen(3000);