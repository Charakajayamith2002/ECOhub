const mongoose=require('mongoose')

const Schema =mongoose.Schema

const fertilizerSchema = new Schema({
    title:{
         type:String,
         required:true
    },

    des:{
        type:String,
        required:true
    },


    price:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },
    image:{
        type: String,
        required: true
    }
    


},{  timestamp: true})


module.exports = mongoose.model('fertilizer', fertilizerSchema);

