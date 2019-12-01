<template>
  <div class="noticeComponent">
    <h2>Notizen</h2>
    <b-button
      :pressed.sync="createNote"
      class="addButtonClass"
      v-if="editMode && !createNote"
      variant="outline-success"
    >Neue Notiz</b-button>
    <b-form-textarea
      v-model="message"
      v-if="createNote"
      id="textarea-default"
      placeholder="Neue Notiz..."
    ></b-form-textarea>
    <b-button
      v-if="createNote"
      :pressed.sync="createNote"
      variant="outline-danger"
      class="createNoteButton"
    >Verwerfen</b-button>
    <b-button
      v-if="createNote"
      :pressed.sync="createNote"
      variant="primary"
      class="createNoteButton"
      v-on:click="saveNote()"
    >Speichern</b-button>
    <b-list-group>
      <b-list-group-item v-for="note in noticeDataArray" v-bind:key="note.text">
        <p class="timeclass">{{ getDate(note.time)}}</p>
        {{ note.text }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "NoticeComponent",
  props: {
    noticeDataArray: Array,

    editMode: Boolean
  },
  methods: {
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
    saveNote() {
      this.noticeDataArray.push({
        text: this.message,
        time: new Date().getTime(),
        id: this.DataHandler.uuidv4()
      });
      this.DataHandler.saveData();
    }
  },
  data() {
    return {
      createNote: false,
      message: ""
    };
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
  margin-bottom: 10px;
}

.createNoteButton {
  margin: 12px;
  margin-left: 0px;
}
</style>
