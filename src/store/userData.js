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
