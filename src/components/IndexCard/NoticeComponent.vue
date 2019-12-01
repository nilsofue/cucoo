<template>
  <div class="noticeComponent">
    <h2>Notizen</h2>
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
    noticeDataArray: Array
  },
  methods: {
    getDate(dateObject) {
      dateObject = new Date(dateObject);
      return (
        dateObject.getHours() +
        ":" +
        dateObject.getHours() +
        " Uhr am " +
        dateObject.getDay() +
        "." +
        dateObject.getMonth() +
        "." +
        dateObject.getFullYear()
      );
    }
  }
};
</script>

<style scoped lang="scss">
.timeclass {
  color: grey;
  font-size: 14px;
}
</style>
