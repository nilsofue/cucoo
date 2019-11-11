import axios from "axios";
import inputData from "./assets/sampleData.json"; //only for testing

export default new (class {
  constructor() {
    this.useBackend = true;
  }

  async getData() {
    if (this.useBackend) {
      try {
        const response = await axios.get("localhost:3000/");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      return inputData; //only for testing
    } else {
      return inputData; //only for testing
    }
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
