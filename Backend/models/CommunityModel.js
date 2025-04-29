const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  fertilizer: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  uname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  disc: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
  pest:{
    type:String,
    required:true,
  },
  pestcontral:{
    type:String,
    required:true
  },
  challenge:{
    type:String,
    required:true
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);