const Task = require("./Task");
const FixedTask = require('./FixedTask');
const FootPrint = require("./FootPrint");

const db = {};

db.Task = Task;
db.FixedTask = FixedTask;
db.FootPrint = FootPrint
module.exports = db;
