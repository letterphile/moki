const BasicOperations = require("./basic.operation");
const db = require("../models");

class FixedTaskOperations extends BasicOperations {
  constructor() {
    super(db.FixedTask);
  }

  /*Add Model specific operations here */
}

module.exports = FixedTaskOperations;
