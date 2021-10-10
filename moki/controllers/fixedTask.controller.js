const db = require("../models");

const BasicController = require("./basic.controller")

const FixedTaskOperation = require("../operations/fixedTask.operation");

class TaskController extends BasicController {
  constructor() {
    super(db.FixedTask);
    this.modelOperations = new FixedTaskOperation();
  }

  // add more controllers if required..
  create = async (req, res, next) => {
    try {
      
      if(req.body.radio=="2"){
        req.body.recurring = true
      }
        await this.modelOperations.create(req.body);
     
      
      res.send({
        status: "success",
        info: result,
        message: `Document inserted to ${this.model.prototype.constructor.modelName}`,
      });
    } catch (err) {
      console.log("Error", err);
      res.send({
        status: "failure",
        info: req.body,
        message: "something went wrong",
      });
    }
  };
}

const controller = new TaskController();

module.exports = controller;
