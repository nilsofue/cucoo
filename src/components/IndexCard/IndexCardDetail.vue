<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company">
      <p>
        <br />
        {{ indexCardData.adress.street }} {{ indexCardData.adress.houseNumber }}
        <br />
        {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
      </p>
      <NoticeComponent :noticeDataArray="indexCardData.notes" :editMode="true"></NoticeComponent>
    </b-modal>
  </div>
</template>

<script>
import NoticeComponent from "@/components/IndexCard/NoticeComponent.vue";

export default {
  name: "IndexCardDetail",
  components: {
    NoticeComponent
  },
  props: {
    indexCardData: Object
  }
};
</script>

<style scoped lang="scss"></style>
