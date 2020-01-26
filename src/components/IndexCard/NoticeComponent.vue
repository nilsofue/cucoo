<template>
  <div class="noticeComponent">
    <div class="noticeOverviewHead">
      <h3>Notizen</h3>
      <b-button
        v-if="editMode && !createNote"
        :pressed.sync="createNote"
        class="addButtonClass"
        variant="outline-success"
      >
        <font-awesome-icon icon="plus" />
      </b-button>
    </div>

    <b-form-textarea
      v-if="createNote"
      id="textarea-default"
      v-model="message"
      placeholder="Neue Notiz..."
      @keyup="onKeyPress"
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
    <div>
      <div
        v-for="note in noticeDataArray"
        :key="note.text"
        class="noticeEntryClass"
      >
        <div class="noticeHeadlineClass">
          <p class="timeclass">{{ getDate(note.time) }}</p>
          <b-button
            v-if="editMode"
            class="deleteButtonClass"
            variant="outline-danger"
            @click="deleteNote(note.id)"
          >
            <font-awesome-icon icon="times" />
          </b-button>
        </div>
        {{ note.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add([faPlus, faTimes]);

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
        id: this.ToolHandler.uuidv4()
      };
      this.addNoteByIndexCardId({
        noteData: newNote,
        indexCardId: this.indexCardId
      });
    },
    onKeyPress(event) {
      if (event.keyCode === 13) {
        // Enter key
        this.saveNote();
        this.createNote = false;
        this.message = "";
      }
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
  border: none;
  margin-top: -4px;
}

.createNoteButton {
  margin: 12px;
  margin-left: 0px;
}

.noticeHeadlineClass {
  display: flex;
}
.deleteButtonClass {
  color: rgb(189, 0, 0);
  margin-left: auto;
  border: none;
  margin-right: -13px;
  margin-top: -16px;
}

.noticeOverviewHead {
  display: flex;
  margin-bottom: 7px;
  margin-top: 32px;
}
.noticeEntryClass {
  background-color: #eaeaea;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 12px;
}
#textarea-default {
  border-radius: 10px;
}
</style>
