import inputData from "./assets/sampleData.json"; //only for testing

export default new (class {
  constructor() {}

  getData() {
    return inputData; //only for testing
  }

  changeData(dataSetId, statusId, indexCardId) {
    console.log("Change data" + dataSetId, statusId, indexCardId);
  }

  addData(dataSetId, statusId, indexCardId) {
    console.log("Add data" + dataSetId, statusId, indexCardId);
  }

  deleteData(dataSetId, statusId, indexCardId) {
    console.log("Delete data" + dataSetId, statusId, indexCardId);
  }
})();
