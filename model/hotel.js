const mongoose = require ("mongoose")

const HotelSchema = new mongoose.Schema ({
    title : {
        type : String , 
        required : true 
    },
    image : {
        type : String , 
        required : true 
    } , 
    desc : {
        type : String , 
        required : true 
    }
})

module.exports = new mongoose.model ("Hotel" , HotelSchema) 