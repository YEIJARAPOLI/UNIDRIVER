'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    lasname: String,
    email: String,
    password: String,
    profile: String
});

module.exports = mongoose.model('User', UserSchema);