require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// config body-parser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));


mongoose.connect('mongodb+srv://rleon:hGw0uFf9r6B6l4pb@cluster0-cmcha.mongodb.net/NODE-COURSE01?retryWrites=true&w=majority', (err, res) => {
    if (err) throw err;

    console.log('base de datos online')

});

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT);
});