const express = require("express");

const app = express();

app.use(express.json())

function logRequest(req, res, next) {
    console.log("request received");
    next();
}

function modifyRequest(req, res, next) {
    req.name = "harkirat"
    next();
}

function endRequestResponse(req, res, next) {
    res.json({
        message: "You are not allowed"
    })
}

app.use(logRequest, modifyRequest, endRequestResponse)


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




app.listen(3000, () => {
    console.log('server is listening on port 3000');
})