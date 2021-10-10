const db = require("../models");

const BasicController = require("../controllers/basic.controller")

const footPrintOperation = require("../operations/footPrint.operation");

class FootPrintController extends BasicController {
  constructor() {
    super(db.FootPrint);
    this.modelOperations = new footPrintOperation();
  }
  
  // add more controllers if required..

  
}

const controller = new FootPrintController();

module.exports = controller;
