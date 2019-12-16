<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company">
      <p>
        <br />
        {{ indexCardData.adress.street }} {{ indexCardData.adress.houseNumber }}
        <br />
        {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
      </p>
      <b-dropdown id="dropdown-1" :text="cardStatusICD" class="m-md-2">
        <b-dropdown-item>{{ cardStatusICD }}</b-dropdown-item>
        <b-dropdown-item>Termin</b-dropdown-item>
        <b-dropdown-item>kein Interesse</b-dropdown-item>
      </b-dropdown>
      <NoticeComponent
        :notice-data-array="indexCardData.notes"
        :index-card-id="indexCardData.id"
        :edit-mode="true"
      ></NoticeComponent>
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
    indexCardData: Object,
    cardStatusICD: String
  }
};

// timestamp: new Date().getTime()
</script>

<style scoped lang="scss"></style>
