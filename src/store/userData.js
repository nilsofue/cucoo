import axios from "axios";
import inputData from "@/assets/sampleData.json"; //only for testing

const useBackend = true;
const pathToBackend = "http://localhost:3000/";

export default {
  namespace: true,
  state: {
    data: {},
    loading: true
  },
  mutations: {
    changeIndexCardData(state, newData) {
      for (let i = 0; i < state.data.status.length; i++) {
        for (let indexCard of state.data.status[i].entries) {
          if (indexCard.id === newData.id) {
            // find index card
            indexCard.adress.street = newData.adress.street;
            indexCard.adress.houseNumber = newData.adress.houseNumber;
            indexCard.adress.postCode = newData.adress.postCode;
            indexCard.adress.city = newData.adress.city;
            indexCard.phone = newData.phone;

            indexCard.date = newData.date;
            indexCard.company = newData.company;

            return;
          }
        }
      }
    },
    addNewIndexCard(state, newData) {
      let newIndexCardData = {
        id: newData.id,
        createTime: new Date().getTime(),
        date: newData.date,
        company: newData.company,
        adress: {
          street: newData.adress.street,
          houseNumber: newData.adress.houseNumber,
          postCode: newData.adress.postCode,
          city: newData.adress.city
        },
        phone: newData.phone,
        notes: []
      };
      for (let i = 0; i < state.data.status.length; i++) {
        if (state.data.status[i].id === newData.statusId) {
          state.data.status[i].entries.push(newIndexCardData);
          return;
        }
      }
    },
    changeIndexCardStatus(state, newStatusData) {
      let entryData;
      let breakFlag = false;
      for (let i = 0; i < state.data.status.length; i++) {
        for (let indexOfindexCard in state.data.status[i].entries) {
          let indexCard = state.data.status[i].entries[indexOfindexCard];
          if (indexCard.id === newStatusData.indexCardId) {
            // find index card
            entryData = JSON.parse(JSON.stringify(indexCard));
            state.data.status[i].entries.splice(indexOfindexCard, 1);
            breakFlag = true;
            break;
          }
        }
        if (breakFlag) break;
      }
      for (let i = 0; i < state.data.status.length; i++) {
        if (state.data.status[i].id === newStatusData.statusId) {
          state.data.status[i].entries.push(entryData);
          return;
        }
      }
    },

    updateData(state, newData) {
      state.data = newData;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    addNoteByIndexCardId(state, data) {
      for (let i = 0; i < state.data.status.length; i++) {
        for (let indexCard of state.data.status[i].entries)
          if (indexCard.id === data.indexCardId) {
            // find index card
            indexCard.notes.push(data.noteData);
            return;
          }
      }
    },
    deleteNoteByNoteId(state, data) {
      for (let i = 0; i < state.data.status.length; i++) {
        for (let indexCard of state.data.status[i].entries)
          if (indexCard.id === data.indexCardId) {
            // find index card
            for (let i = 0; i < indexCard.notes.length; i++) {
              if (data.noteId == indexCard.notes[i].id) {
                // find note
                indexCard.notes.splice(i, 1);
                return;
              }
            }
          }
      }
    }
  },

  actions: {
    async addNewIndexCard({ dispatch, commit }, data) {
      commit("addNewIndexCard", data);
      await dispatch("saveData");
    },
    async changeIndexCardData({ dispatch, commit }, data) {
      commit("changeIndexCardData", data);
      await dispatch("saveData");
    },
    async changeIndexCardStatus({ dispatch, commit }, data) {
      commit("changeIndexCardStatus", data);
      await dispatch("saveData");
    },
    async getData({ commit }) {
      if (useBackend) {
        try {
          commit("setLoading", true);
          const response = await axios.get(pathToBackend + "data");
          console.log(response);
          commit("updateData", response.data);
          commit("setLoading", false);
        } catch (error) {
          commit("setLoading", false);
          console.error(error);
        }
      } else {
        commit("updateData", inputData);
      }
    },
    async saveData({ state }) {
      if (useBackend) {
        try {
          await axios.post(pathToBackend + "dataPost", state.data).then(
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
    },
    async addNoteByIndexCardId({ dispatch, commit }, data) {
      commit("addNoteByIndexCardId", data);
      await dispatch("saveData");
    },
    async deleteNoteByNoteId({ dispatch, commit }, data) {
      commit("deleteNoteByNoteId", data);
      await dispatch("saveData");
    }
  },

  // Zugriff über mapGetters
  getters: {
    data: state => {
      return state.data;
    },
    loading: state => {
      return state.loading;
    },
    allStates: state => {
      let dummyState = {
        id: "id_all_states",
        name: "Alle Status",
        color: "#007bff",
        entries: []
      };

      for (let stateEntry of state.data.status) {
        for (let indexCardData of stateEntry.entries) {
          dummyState.entries.push(indexCardData);
        }
      }
      return dummyState;
    },
    getStatusDataByIndexCardId: state => indexCardId => {
      for (let stateEntry of state.data.status) {
        for (let indexCardData of stateEntry.entries) {
          if (indexCardId === indexCardData.id) {
            return stateEntry;
          }
        }
      }
      return null;
    }
  }
};
