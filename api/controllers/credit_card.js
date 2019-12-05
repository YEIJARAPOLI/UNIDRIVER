'use strict'

var CreditCard = require('../models/credit_card');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveCreditCard(req, res) {
    var creditCard = new CreditCard();

    var params = req.body;

    console.log(params);

    creditCard.name = params.name;
    creditCard.number = params.number;
    creditCard.date = params.date;
    creditCard.cvv = params.cvv;
    creditCard.franchise = params.franchise;
    creditCard.user = params.user;

    creditCard.save((err, creditCardStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar la tarjeta de crédito'
            });
        } else {
            if (!creditCardStored) {
                res.status(404).send({
                    message: 'No se ha registrado la tarjeta de crédito'
                });
            } else {
                res.status(200).send({
                    creditCard: creditCardStored
                });
            }
        }
    });
}

function getCreditCards(req, res) {
    var userId = req.params.user;
    console.log(userId);

    if (userId) {
        var find = CreditCard.find({user: userId});

        find.populate({path: 'user'}).exec((err, creditCards) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en la petición'
                });
            } else {
                if (!creditCards) {
                    res.status(404).send({
                        message: 'No hay tarjetas'
                    });
                } else {
                    res.status(200).send({
                        creditCards
                    });
                }
            }
        });
    }
}

module.exports = {
    saveCreditCard,
    getCreditCards
};