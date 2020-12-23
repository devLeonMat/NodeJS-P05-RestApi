const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const _ = require('underscore');

const app = express();


app.get('/', function (req, res) {
    res.json('Hello World')
});

app.get('/usuario', function (req, res) {
    res.json('get usuario')
});

app.post('/usuario', function (req, res) {
    // obtener informacion del x-www-form-urlencoded
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                id: id,
                usuario: usuarioDB
            })
        }
    )
    ;

});

app.delete('/usuario', function (req, res) {
    res.json('delete  usuario')
});

module.exports = app;
