var express = require("express");
var router = express.Router();
const fs = require("fs").promises;
const dataSetPath = "./routes/server_data/dataset.json";

router.get("/data", function(req, res, next) {
  loadUserData()
    .then(inputData => {
      res.json(JSON.parse(inputData));
    })
    .catch(err => {
      console.log("Error reading file from disk:", err);
      if (err.errno == -2) {
        createNewUserData();
        loadUserData().then(inputData => {
          res.json(JSON.parse(inputData));
        });
      }
    });
});

router.post("/dataPost", function(req, res) {
  updateUserData(req.body);
  console.log(req.body);
  res.end("Get data successfull.");
});

module.exports = router;

const loadUserData = async () => {
  const content = await fs.readFile(dataSetPath, "utf8");
  return content;
};

function createNewUserData() {
  const userData = {
    timestamp: new Date().getTime(),
    id: uuidv4(),
    name: "Max Mustermanns Kunden-Dashboard",
    status: []
  };
  const jsonString = JSON.stringify(userData);
  fs.writeFile(dataSetPath, jsonString, err => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}

function updateUserData(userData) {
  const jsonString = JSON.stringify(userData);
  fs.writeFile(dataSetPath, jsonString, err => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
