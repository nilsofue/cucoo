import axios from "axios";
import inputData from "./assets/sampleData.json"; //only for testing

export default new (class {
  constructor() {
    this.useBackend = false;
    this.pathToBackend = "http://localhost:3000/";
  }

  async getData() {
    if (this.useBackend) {
      try {
        const response = await axios.get(this.pathToBackend);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      return inputData; //only for testing
    }
  }

  changeData(dataSetId, statusId, indexCardId, indexCardData) {
    console.log(
      "Change data" + dataSetId,
      statusId,
      indexCardId,
      indexCardData
    );
  }

  addData(dataSetId, statusId, indexCardId, indexCardData) {
    console.log("Add data" + dataSetId, statusId, indexCardId, indexCardData);
  }

  deleteData(dataSetId, statusId, indexCardId, indexCardData) {
    console.log(
      "Delete data" + dataSetId,
      statusId,
      indexCardId,
      indexCardData
    );
  }
})();
