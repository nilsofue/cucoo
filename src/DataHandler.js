import axios from "axios";
import inputData from "./assets/sampleData.json"; //only for testing

export default new (class {
  constructor() {
    this.useBackend = true;
  }

  async getData() {
    if (this.useBackend) {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
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
