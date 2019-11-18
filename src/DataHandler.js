import inputData from "./assets/sampleData.json"; //only for testing
import DataManipulator from "./DataManipulator.js";

export default new (class {
  constructor() {
    this.data = null;
  }

  getData() {
    this.data = inputData;
    return inputData; //only for testing
  }

  changeData(statusId, indexCardId, newIndexCardData) {
    DataManipulator.changeIndexCardData(
      this.data,
      statusId,
      indexCardId,
      newIndexCardData
    );
  }

  addData(statusId, indexCardData) {
    DataManipulator.addIndexCard(this.data, statusId, indexCardData);
  }

  deleteData(statusId, indexCardId) {
    console.log("Delete data" + statusId, indexCardId);
  }
})();
