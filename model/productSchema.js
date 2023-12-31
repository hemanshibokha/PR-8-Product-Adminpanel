const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})
const record = mongoose.model('Product',productSchema);
module.exports = record;