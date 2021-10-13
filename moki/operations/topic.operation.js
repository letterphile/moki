const BasicOperations = require("./basic.operation");
const db = require("../models");

class TopicOperations extends BasicOperations {
  constructor() {
    super(db.Topic);
  }

  /*Add Model specific operations here */
}

module.exports = TopicOperations;
