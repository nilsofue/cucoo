<template>
  <div class="indexCard" @click="openModal">
    <b-card
      :title="indexCardData.company"
      :sub-title="'Tel: ' + indexCardData.phone"
    >
      <b-card-text>
        <br />
        {{ indexCardData.adress.street }} {{ indexCardData.adress.houseNumber }}
        <br />
        {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
      </b-card-text>
    </b-card>
    <indexCardDetail :index-card-data="indexCardData"></indexCardDetail>
  </div>
</template>

<script>
import IndexCardDetail from "@/components/IndexCard/IndexCardDetail.vue";

export default {
  name: "IndexCard",
  components: {
    IndexCardDetail
  },
  props: {
    indexCardData: Object
  },
  methods: {
    openModal: function() {
      // $ bedeutet globale Variable
      this.$bvModal.show(this.indexCardData.id);
    }
  }
};
</script>

<style scoped lang="scss">
.indexCard {
  width: 20%;
  min-width: 20%;
  float: left;
  padding: 10px;
}
.card-body {
  height: 200px;
}
.card {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px 1px rgba(179, 179, 179, 0.12);
}
</style>
