const mongoose = require('mongoose');
const subcategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategory : {
        type : String,
        required : true
    }
})
const record = mongoose.model('subcategory',subcategorySchema);
module.exports = record; 