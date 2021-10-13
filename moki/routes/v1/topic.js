var express = require("express");
var router = express.Router();
const Controller = require("../../controllers/topic.controller");

router.get("/", Controller.getAll);
router.post("/create", Controller.create);
router.put("/:id", Controller.findByIdAndUpdate);
router.post("/status", Controller.findOneAndUpdate);

module.exports = router;
