const mongoose = require('mongoose');
const registerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
const record = mongoose.model('User',registerSchema);
module.exports = record;