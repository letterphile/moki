const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  status: String,
  etc: Number,
  hours_done:{
    type:Number,
    default:0
  },
  hours_left:{
    type:Number
  },
  deadline:{
    type:Date
  },
  freeze:{
    type:Boolean,
    default:false
  },
  session_done:Number
}

);

const Model = mongoose.model("Task", schema);

module.exports = Model;

