const express = require("express");

const app = express();

app.use(express.json())

app.use(function(req, res, next) {
    console.log("request received");
    next();
})


app.get('/add', (req, res) => {
    let { a, b } = req.query;
    a = parseInt(a);
    b = parseInt(b)
    

    if(!a || !b)
        return res.status(401).json({
            message : "2 operand are required"
        })

    return res.status(200).json({
        message : 'Operation Successfull',
        operands : [ a, b ],
        result : a+b
    })
})


app.get('/multiply', (req, res) => {
    let { a, b } = req.query;
    a = parseInt(a);
    b = parseInt(b)

    if(!a || !b)
        return res.status(401).json({
            message : "2 operand are required"
        })

    return res.status(200).json({
        message : 'Operation Successfull',
        operands : [ a, b ],
        result : a * b
    })
})


app.get('/divide', (req, res) => {
    let { a, b } = req.query;
    a = parseInt(a);
    b = parseInt(b)

    if(!a || !b)
        return res.status(401).json({
            message : "2 operand are required"
        })

    return res.status(200).json({
        message : 'Operation Successfull',
        operands : [ a, b ],
        result : a / b
    })
})


app.get('/subtract', (req, res) => {
    let { a, b } = req.query;
    a = parseInt(a);
    b = parseInt(b)

    if(!a || !b)
        return res.status(401).json({
            message : "2 operand are required"
        })

    return res.status(200).json({
        message : 'Operation Successfull',
        operands : [ a, b ],
        result : a - b
    })
})


app.listen(3000, () => {
    console.log('server is listening on port 3000');
})