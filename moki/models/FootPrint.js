const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name:String,
  time:{
      type:Date
  },
  duration:Number
});

const Model = mongoose.model("FootPrint", schema);

module.exports = Model;