var express = require("express");
var router = express.Router();
const fs = require("fs");
const dataSetPath = "/server_data/dataset.json";

let inputData = require("../src/assets/sampleData.json"); //only for testing

function fileExists() {
  if (fs.existsSync(dataSetPath)) {
    return true;
  }
  return false;
}

/* GET home page. */
router.get("/data", function(req, res, next) {
  console.log(fileExists());
  res.json(inputData);
});

router.post("/dataPost", function(req, res) {
  console.log(req.body);
  res.send("Alles super!");
});

module.exports = router;
