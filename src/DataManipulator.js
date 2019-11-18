export default class DataManipulator {
  constructor() {}

  static changeIndexCardData(dataSet, statusId, indexCardId, newIndexCardData) {
    console.log("change: " + dataSet, statusId, indexCardId, newIndexCardData);
  }

  static addIndexCard(dataSet, statusId, newIndexCardData) {
    let indexCardEntries = this.getStatusInDataSetById(dataSet, statusId)
      .entries;
    indexCardEntries.push(newIndexCardData);
  }

  static getStatusInDataSetById(dataSet, statusId) {
    return dataSet.status.find(x => x.id === statusId);
  }
}
