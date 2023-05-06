const express = require('express')
const app = express()

const claims = [{eid:1}]

app.get('/claim', (req, res) => {
    res.json(claims)
})
    

app.listen(3000)