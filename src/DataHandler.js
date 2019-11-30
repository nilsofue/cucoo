import axios from "axios";
import inputData from "./assets/sampleData.json"; //only for testing
import DataManipulator from "./DataManipulator.js";

export default new (class {
  constructor() {
    this.data = null;
    this.useBackend = true;
    this.pathToBackend = "http://localhost:3000/";
  }

  async getData() {
    if (this.useBackend) {
      try {
        const response = await axios.get(this.pathToBackend + "data");
        console.log(response);
        this.data = inputData;
        this.changeData(2, 2, 2);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      this.data = inputData;
      return inputData; //only for testing
    }
  }

  async changeData(statusId, indexCardId, newIndexCardData) {
    if (this.useBackend) {
      try {
        await axios
          .post(this.pathToBackend + "dataPost", newIndexCardData)
          .then(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Change data is only available if backend is used!");
    }
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
