const express = require('express');

const app = express();

const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

app.get('/test', function (req, res) {
    res.status(200).json({Nawaf :"N"})
});

module.exports = app;

