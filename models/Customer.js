const { Schema, model } = require('mongoose');

const CustomerSchema = Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    }
});


module.exports = model('Customer', CustomerSchema );

