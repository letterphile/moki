const db = require("../models");

const BasicController = require("../controllers/basic.controller")

const Operation = require("../operations/topic.operation");

class TopicController extends BasicController {
  constructor() {
    super(db.Topic);
    this.modelOperations = new Operation();
  }
  
  // add more controllers if required..

  
}

const controller = new TopicController();

module.exports = controller;
