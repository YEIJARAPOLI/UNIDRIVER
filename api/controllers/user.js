'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.lastname = params.lastname;
    user.email = params.email;
    user.profile = 'ROLE_USER';

    if (params.password) {
        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;

            if (user.name != null && user.lastname != null && user.email != null) {
                // guardar usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'Ingrese todos los datos del usuario'
                })
            }
        });
    } else {
        res.status(200).send({
            message: 'Introduce la contraseña'
        });
    }
}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                // Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check) {
                    if (check) {
                        // devolver los datos del usuario logeado
                        if (params.gethash) {
                            // devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({
                            message: 'El usuario no se pudo loguear'
                        });
                    }
                });
            }
        }
    });
}

module.exports = {
    saveUser,
    loginUser
};