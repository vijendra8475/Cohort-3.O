const express = require("express");

const app = express();

app.use(express.json())

function logRequest(req, res, next) {
    console.log("request received");
    next();
}

const middlewareForAddRoute = (rq, res, next) => {
    console.log('this middleware for add route');
    next();
}

const middlewareForDivideRoute = (rq, res, next) => {
    console.log('this middleware for divide route');
    next();
}

const middlewareForMultiplyRoute = (rq, res, next) => {
    console.log('this middleware for multiply route');
    next();
}

const middlewareForSubtractRoute = (rq, res, next) => {
    console.log('this middleware for subtract route');
    next();
}


app.use(logRequest)


app.get('/add', middlewareForAddRoute, (req, res) => {
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


app.get('/multiply', middlewareForMultiplyRoute, (req, res) => {
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


app.get('/divide', middlewareForDivideRoute, (req, res) => {
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


app.get('/subtract', middlewareForSubtractRoute, (req, res) => {
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