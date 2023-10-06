const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
})
const record = mongoose.model('category',categorySchema);
module.exports = record; 