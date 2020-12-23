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


mongoose.connect('mongodb+srv://{user}:{pass}@cluster0.wyzyd.mongodb.net/NODE-COURSE01?retryWrites=true&w=majority', (err, res) => {
    if (err) throw err;

    console.log('base de datos online')

});

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT);
});
