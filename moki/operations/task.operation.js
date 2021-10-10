const BasicOperations = require("./basic.operation");
const db = require("../models");

class TaskOperations extends BasicOperations {
  constructor() {
    super(db.Task);
  }

  /*Add Model specific operations here */
}

module.exports = TaskOperations;
