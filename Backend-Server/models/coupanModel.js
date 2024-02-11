const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var coupanSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
         upperCase:true
    },
    expiry:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Coupan', coupanSchema);