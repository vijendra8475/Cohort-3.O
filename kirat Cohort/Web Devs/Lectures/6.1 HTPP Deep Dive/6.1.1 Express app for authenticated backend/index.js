import express from 'express';
import { v4 as uuidv4 } from 'uuid'
import { z } from "zod";
import jwt, { decode } from 'jsonwebtoken'
const JWT_SECRET = 'Apna Gang'

const app = express();
app.use(express.json());
app.use(express.static("./public"))

var users = []
const generateToken = () => uuidv4();


const auth = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if(err)
            return res.status(400).json({ message : 'Unauthorized' })

        req.user = decode
        next();
    })
}


const userSchema = z.object({
    username : z.string(),
    password : z.string()
})

app.get("/", function(req, res) {
    res.sendFile("./public/index.html")
})

app.post('/signup', (req, res) => {

    const { username, password } = req.body;

    if(!username || !password)
        return res.status(411).json({ message : 'All fields required'})

    const userx = users.find(u => u.username === username)

    if(userx)
        return res.status(401).json({ message : "usre already exist" })

    const user = {
        username,
        password
    }

    const result = userSchema.safeParse(user)

    if(!result.success)
        return res.status(411).json({ message : 'TypeError by Zod' })
    
    users.push(user)

    return res.status(200).json({
        message : 'signing in successfully completed'
    })

})


app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    if(!username || !password)
        return res.status(411).json({ message : 'All fields required'})

    const user = users.find(u => u.username === username && u.password === password)

    if(!user)
        return res.status(401).json({ message : 'No user exist'})

    var token = jwt.sign({ username }, JWT_SECRET);

    res.status(200).json({ message : 'signing in successfully completed', token})
    
})

app.get('/me', auth, (req, res) => {

    const user = req.user

    res.status(200).json({
        message : 'Authorized',
        username : user.username
    })

})


app.listen(3000, () => {
    console.log('Server is running on PORT : 5000');
} )

