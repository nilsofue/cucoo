var express = require("express");
var router = express.Router();

let inputData = require("../src/assets/sampleData.json"); //only for testing

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json(inputData);
});

module.exports = router;
