'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreditCardSchema = Schema({
    name: String,
    number: String,
    date: String,
    cvv: String,
    franchise: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('CreditCard', CreditCardSchema);