var express = require("express");
var router = express.Router();
const TaskController = require("../../controllers/footPrint.controller");

router.get("/", TaskController.getAll);
router.post("/create", TaskController.create);
router.put("/:id", TaskController.findByIdAndUpdate);
router.post("/status", TaskController.findOneAndUpdate);

module.exports = router;
