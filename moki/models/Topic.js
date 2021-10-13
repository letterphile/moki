const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,

  startDate: {
    type:Date
  }
,
  revisionDates: [{
      date:Date,
      n: {
          type: Number,
          default:0
      },
      m: {
         type: Number,
         default:0 
      }
  }],
  numberOfRevisions:{
      type:Number,
      default:0
  }
}
);

const Model = mongoose.model("Topic", schema);

module.exports = Model;

