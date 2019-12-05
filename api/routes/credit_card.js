'use strict'

var express = require('express');
var CreditCardController = require('../controllers/credit_card');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/credit_card', CreditCardController.saveCreditCard);
api.get('/credit_card/:user', CreditCardController.getCreditCards);

module.exports = api;