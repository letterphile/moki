const Task = require("./Task");
const FixedTask = require('./FixedTask');
const FootPrint = require("./FootPrint");
const Topic = require("./Topic");
const db = {};

db.Task = Task;
db.FixedTask = FixedTask;
db.FootPrint = FootPrint
db.Topic = Topic
module.exports = db;
