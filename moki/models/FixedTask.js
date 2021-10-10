const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  task:{
    name: String,
    status: String,
    etc: Number,
    session_done:Number,

    hours_done:{
      type:Number,
      default:0
    },
    hours_left:Number
  }
  ,
  
  time:{
    type:Date
  },
  ltd:Number,
  recurring:{
    type: Boolean,
    default: false
}
});

const Model = mongoose.model("FixedTask", schema);

module.exports = Model;

