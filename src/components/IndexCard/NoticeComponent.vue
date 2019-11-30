<template>
  <div class="noticeComponent">
    <b-list-group>
      <b-list-group-item v-for="note in noticeDataArray" v-bind:key="note.text"
        >{{ note.text }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "NoticeComponent",
  props: {
    noticeDataArray: Array
  }
};
</script>

<style scoped lang="scss"></style>
