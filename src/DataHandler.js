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

  addIndexCard(statusId, indexCardData) {
    DataManipulator.addIndexCard(this.data, statusId, indexCardData);
  }

  deleteIndexCard(statusId, indexCardId) {
    DataManipulator.deleteIndexCard(this.data, statusId, indexCardId);
  }
})();
