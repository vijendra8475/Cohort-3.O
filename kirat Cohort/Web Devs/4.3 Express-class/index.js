const express = require('express')
const app = express();

app.use(express.json())

var users = [{
    name : 'jhon',
    kidneys : [{
        healthy : false
    }, {
        healthy : true
    }, {
        healthy : true
    }]
}]


app.get('/', (req, res) => {
    const jhonKidenys = users.find(obj => obj.name === 'jhon').kidneys
    const totalKidneys = jhonKidenys.length;

    let numberOfHealthyKidneys = jhonKidenys.filter(kidney => kidney.healthy === true).length
    let numberOfUnhealthyKidneys = jhonKidenys.filter(kidney => kidney.healthy === false).length

    console.log(numberOfHealthyKidneys);

    res.status(200).json({
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

})

app.post('/', (req, res) => {
    const isHealthy = req.body.kidney;
    const jhonKidenys = users.find(obj => obj.name === 'jhon').kidneys
    jhonKidenys.push({
        healthy : isHealthy
    })

    res.status(200).json({
        message : "Done !",
        kidneys : jhonKidenys
    })

})

app.put('/', (req, res) => {
    const jhonKidenys = users.find(obj => obj.name === 'jhon').kidneys.length
    
    for(let i=0; i<jhonKidenys; i++)
        users[0].kidneys[i].healthy = true

    res.status(200).json({
        message : 'Done',
        users
    })
})

app.delete('/', (req, res) => {

    users[0].kidneys = users[0].kidneys.filter(k => k.healthy === true)
  
    res.status(200).json({
        message : 'Done',
        users
    })
})



app.listen(3000);