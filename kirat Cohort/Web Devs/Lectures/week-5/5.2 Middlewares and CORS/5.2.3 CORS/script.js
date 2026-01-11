const express = require("express");
const app = express();
// const cors = require('cors')

// app.use(cors());


app.get('/sum', (req, res) => {
    console.log("Server : on");
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.status(200).json({
        result : a + b
    })

})

app.listen(5000)