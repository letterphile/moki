const TaskOperation = require("../operations/task.operation");
const FixedTaskOperation = require("../operations/fixedTask.operation");
const axios = require('axios');
require('dotenv').config()

async function createSchedule (req, res, next) {
    try {
        const taskObject = new TaskOperation()
        const fixedTaskObject = new FixedTaskOperation()
        const tasks = await taskObject.find({"freeze":false,"hours_left":{"$gt":0}})
        const fixedTasks = await fixedTaskObject.find()
        
       
        axios.post(`http://${process.env.PY_HOST}:${process.env.PY_PORT}/schedule`,{
            "tasks":tasks,
            "fixed_tasks":fixedTasks
    
        })
  .then((response) => {
    
    res.send({
        status: "success",
         info: response.data,
        // message: `Document inserted to ${this.model.prototype.constructor.modelName}`,
      });
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


  async function dobTask (req, res, next) {
    console.log(process.env.PY_HOST)
    console.log(process.env.PY_PORT)
    try {
        const taskObject = new TaskOperation()
        const fixedTaskObject = new FixedTaskOperation()
        const tasks = await taskObject.find({"hours_left":{"$gt":0},"freeze":false})
        const frozenTasks = await taskObject.find({"hours_left":{"$gt":0},"freeze":true})
        const fixedTasks = await fixedTaskObject.find()
        
       
        axios.post(`http://${process.env.PY_HOST}:${process.env.PY_PORT}/schedule/tasks`,{
            "tasks":tasks,
            "fixed_tasks":fixedTasks
    
        })
  .then((response) => {
    

    res.send({
        status: "success",
         info: response.data,
         frozenTasks:frozenTasks
        // message: `Document inserted to ${this.model.prototype.constructor.modelName}`,
      });
  }).catch(e=>{
    console.log(e)
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


module.exports = {
    createSchedule,
    dobTask
}