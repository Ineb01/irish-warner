const express = require('express')
const path = require('path')
const irish = require('./irish');
const PORT = process.env.PORT || 5000

const app = express();

app.get('/api/count', (req, res) => {
  irish.countAvailableTables(8, new Date("2022-06-01")).then((data) => {
    res.json({open:data});
  })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
