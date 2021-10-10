const db = require("../models");

const BasicController = require("../controllers/basic.controller")

const TaskOperation = require("../operations/task.operation");
const footPrintOperation = require("../operations/footPrint.operation")
class TaskController extends BasicController {
  constructor() {
    super(db.Task);
    this.modelOperations = new TaskOperation();
  }
  
  findOneAndUpdate = async (req, res, next) => {
    try {
      const result = await this.modelOperations.findOneAndUpdate(
        req.body.filter,
        req.body.update
      );
      if(req.body.filter.duration){
      const result2 = await new footPrintOperation().create({
        "name":req.body.filter.name,
        "time": req.body.filter.time,
        "duration":req.body.filter.duration
      }
      );
    }
      res.send({
        status: "success",
        info: result.result,
        message: result.message,
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
