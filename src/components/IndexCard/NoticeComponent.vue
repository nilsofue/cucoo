<template>
  <div class="noticeComponent">
    <div class="noticeOverviewHead">
      <h3>Notizen</h3>
      <b-button
        v-if="editMode && !createNote"
        :pressed.sync="createNote"
        class="addButtonClass"
        variant="outline-success"
        ><font-awesome-icon icon="plus"
      /></b-button>
    </div>

    <b-form-textarea
      v-if="createNote"
      id="textarea-default"
      v-model="message"
      placeholder="Neue Notiz..."
    ></b-form-textarea>
    <b-button
      v-if="createNote"
      :pressed.sync="createNote"
      variant="outline-danger"
      class="createNoteButton"
      >Verwerfen</b-button
    >
    <b-button
      v-if="createNote"
      :pressed.sync="createNote"
      variant="primary"
      class="createNoteButton"
      @click="saveNote()"
      >Speichern</b-button
    >
    <b-list-group>
      <b-list-group-item v-for="note in noticeDataArray" :key="note.text">
        <div class="noticeHeadlineClass">
          <p class="timeclass">{{ getDate(note.time) }}</p>
          <b-button
            class="deleteButtonClass"
            variant="outline-danger"
            @click="deleteNote(note.id)"
            ><font-awesome-icon icon="trash"
          /></b-button>
        </div>

        {{ note.text }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add([faPlus, faTrash]);

export default {
  name: "NoticeComponent",
  props: {
    noticeDataArray: Array,
    indexCardId: String,
    editMode: Boolean
  },
  data() {
    return {
      createNote: false,
      message: ""
    };
  },
  methods: {
    ...mapActions(["addNoteByIndexCardId", "deleteNoteByNoteId"]),
    getDate(dateObject) {
      dateObject = new Date(dateObject);
      let hours = dateObject.getHours();
      hours = ("0" + hours).slice(-2);
      let minutes = dateObject.getMinutes();
      minutes = ("0" + minutes).slice(-2);
      let day = dateObject.getDate();
      day = ("0" + day).slice(-2);
      let month = dateObject.getMonth() + 1;
      month = ("0" + month).slice(-2);
      return (
        hours +
        ":" +
        minutes +
        " Uhr am " +
        day +
        "." +
        month +
        "." +
        dateObject.getFullYear()
      );
    },
    deleteNote(id) {
      this.deleteNoteByNoteId({
        noteId: id,
        indexCardId: this.indexCardId
      });
    },
    saveNote() {
      var newNote = {
        text: this.message,
        time: new Date().getTime(),
        id: this.DataHandler.uuidv4()
      };
      this.addNoteByIndexCardId({
        noteData: newNote,
        indexCardId: this.indexCardId
      });
    }
  }
};
</script>

<style scoped lang="scss">
.timeclass {
  color: grey;
  font-size: 13px;
  margin-bottom: 5px;
}

.addButtonClass {
  margin-left: 10px;
}

.createNoteButton {
  margin: 12px;
  margin-left: 0px;
}

.noticeHeadlineClass {
  display: flex;
}
.deleteButtonClass {
  line-height: 3px;
  font-size: 10px;
  margin-left: 20px;
}

.noticeOverviewHead {
  display: flex;
  margin-bottom: 10px;
}
</style>
