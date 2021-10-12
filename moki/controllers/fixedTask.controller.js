const db = require("../models");

const BasicController = require("./basic.controller")

const FixedTaskOperation = require("../operations/fixedTask.operation");
const footPrintOperation = require("../operations/footPrint.operation")
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

  findOneAndUpdate = async (req, res, next) => {
    try {
      const result = await this.modelOperations.findOneAndUpdate(
        req.body.filter,
        req.body.update
      );

      if(req.body.filter.duration){
        console.log("Adding footprint for ", req.body.filter.name)
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
