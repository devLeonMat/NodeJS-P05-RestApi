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

app.get('/', function (req, res) {
    res.json('Hello World')
});

app.get('/usuario', function (req, res) {
    res.json('get usuario')
});

app.post('/usuario', function (req, res) {
    // obtener informacion del x-www-form-urlencoded
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {
        res.json({
            persona: body
        })
    }

});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id: id
    })
});

app.delete('/usuario', function (req, res) {
    res.json('delete  usuario')
});

mongoose.connect('mongodb://localhost/my_database');



app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT);
});