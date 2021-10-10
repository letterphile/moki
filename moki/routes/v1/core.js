const coreController = require("../../controllers/core.controller");
var express = require("express");
var router = express.Router();

router.get("/get", coreController.createSchedule);
router.get("/task", coreController.dobTask);


module.exports = router;