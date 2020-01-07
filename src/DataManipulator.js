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

  static deleteIndexCard(dataSet, statusId, indexCardId) {
    let indexCardEntries = this.getStatusInDataSetById(dataSet, statusId)
      .entries;
    let foundIndex = indexCardEntries.findIndex(x => x.id === indexCardId);
    indexCardEntries.splice(foundIndex, 1);
  }

  static getStatusInDataSetById(dataSet, statusId) {
    return dataSet.status.find(x => x.id === statusId);
  }

  static addNoteByIndexCardId(dataSet, indexCardId, noteData) {
    this.getIndexCardById(dataSet, indexCardId).notes.push(noteData);
    console.log(dataSet);
  }

  static getIndexCardById(dataset, indexCardId) {
    for (let i = 0; i < dataset.status.length; i++) {
      for (let indexCard of dataset.status[i].entries)
        if (indexCard.id === indexCardId) {
          return indexCard;
        }
    }
    return null;
  }
}
