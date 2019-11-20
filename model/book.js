const mongoose = require ("mongoose")

const bookSchema = mongoose.Schema ({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" 
    } , 
    hotel : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Hotel"
    } , 
    nbperson : {
        type : String , 
        required : true 
    } , 
    date : {
        type : Date ,
        required : true 
    }
})

module.exports = new mongoose.model ("Book" , bookSchema)