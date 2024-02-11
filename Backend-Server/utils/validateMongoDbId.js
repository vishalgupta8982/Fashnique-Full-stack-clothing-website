const mongoose = require("mongoose");
const validateMongoDbId=(id)=>{
    const isValid=mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error("This id us not valid or not found")
    }
}
module.exports=validateMongoDbId