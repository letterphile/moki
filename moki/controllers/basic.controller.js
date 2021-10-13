const BasicOperations = require("../operations/basic.operation");

// const Scheduler = require("../lib/scheduler.service");
// const scheduleTask = require("../lib/wrapper.service");
//const {toYellow,toOrange,toPurple,toRed} = require('../lib/taskSubmit.service')
// const {
//   toYellow,
//   toRed,
//   toOrange,
//   toPurple,
// } = require("../lib/taskList.service");

class BasicController {
  constructor(model) {
    this.model = model;
    this.modelOperations = new BasicOperations(this.model);
  }

  getById = async (req, res, next) => {
    try {
      const result = await this.modelOperations.findById(id);

      res.send({
        status: "success",
        info: result,
        message: `Document with id :${id} from ${this.model.prototype.constructor.modelName}`,
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

  getAll = async (req, res, next) => {
    
    try {
      
      const result = await this.modelOperations.find();

      res.send({
        status: "success",
        info: result,
        message: `Documents from ${this.model.prototype.constructor.modelName}`,
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

  create = async (req, res, next) => {
    try {
      const result = await this.modelOperations.create(req.body);

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

//   createAndSchedule = async (req, res, next) => {
//     try {
//       const result = await this.modelOperations.create(req.body);

//       // const scheduler = new Scheduler();

//       const taskData = {
//         objectId: result._id,
//       };

//       // const toYellowDataTime=toYellow(taskData)
//       // scheduler.submitTask(toYellowDataTime.data,toYellowDataTime.timeStamp)

//       // const toOrangeDataTime=toOrange(taskData)
//       // scheduler.submitTask(toOrangeDataTime.data,toOrangeDataTime.timeStamp)

//       // const toPurpleDataTime=toPurple(taskData)
//       // scheduler.submitTask(toPurpleDataTime.data,toPurpleDataTime.timeStamp)

//       // const toRedDataTime=toRed(taskData)
//       // scheduler.submitTask(toRedDataTime.data,toRedDataTime.timeStamp)
//       scheduleTask.add(toYellow, taskData, 1);
//       scheduleTask.add(toOrange, taskData, 2);
//       scheduleTask.add(toPurple, taskData, 3);
//       scheduleTask.add(toRed, taskData, 4);

//       res.send({
//         status: "success",
//         info: result,
//         message: `Document inserted to ${this.model.prototype.constructor.modelName} and Task Scheduled`,
//       });
//     } catch (err) {
//       console.log("Error", err);
//       res.send({
//         status: "failure",
//         info: req.body,
//         message: "something went wrong",
//       });
//     }
//   };

  findByIdAndUpdate = async (req, res, next) => {
    try {
      const result = await this.modelOperations.findByIdAndUpdate(
        req.params.id,
        req.body
      );

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

  findOneAndIncrement = async (req, res, next) => {
    try {
      const result = await this.modelOperations.findOneAndIncrement(
        req.body.filter,
        req.body.update
      );

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

  findOneAndUpdate = async (req, res, next) => {
    try {
      const result = await this.modelOperations.findOneAndUpdate(
        req.body.filter,
        req.body.update
      );
      
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

  

  removeAddedWithId = async (req, res, next) => {
    try {
      const result = await this.modelOperations.removeAddedWithId(
        req.body.idFrom,
        req.body.key,
        req.body.idToBeRemoved
      );

      res.send({
        status: "success",
        info: result,
        message: `Document id ${req.body.idToBeRemoved} removed from ${req.body.key} in ${this.model.prototype.constructor.modelName}`,
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

//   permissionChecker = async (req, res, next, permission) => {
//     try {
//     } catch (err) {}
//   };
} 

module.exports = BasicController;
