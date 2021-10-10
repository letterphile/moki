const BasicOperations = require("./basic.operation");
const db = require("../models");

class FootPrint extends BasicOperations {
  constructor() {
    super(db.FootPrint);
  }

  /*Add Model specific operations here */
}

module.exports = FootPrint;
