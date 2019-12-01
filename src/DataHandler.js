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
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      this.data = inputData;
      return inputData; //only for testing
    }
  }

  async saveData() {
    if (this.useBackend) {
      console.log(this.data);
      try {
        await axios.post(this.pathToBackend + "dataPost", this.data).then(
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
      console.warn("Saving data is only available if backend is used!");
    }
  }

  addIndexCard(statusId, indexCardData) {
    DataManipulator.addIndexCard(this.data, statusId, indexCardData);
  }

  deleteIndexCard(statusId, indexCardId) {
    DataManipulator.deleteIndexCard(this.data, statusId, indexCardId);
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
})();
