import axios from "axios";
import inputData from "./assets/sampleData.json"; //only for testing
import DataManipulator from "./DataManipulator.js";

export default new (class {
  constructor() {
    this.data = null;
    this.useBackend = false;
    this.pathToBackend = "http://localhost:3000/";
  }

  async getData() {
    if (this.useBackend) {
      try {
        const response = await axios.get(this.pathToBackend);
        console.log(response);
        this.data = inputData;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      this.data = inputData;
      return inputData; //only for testing
    }
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
