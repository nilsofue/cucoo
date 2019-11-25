<template>
  <div class="indexCardHandler">
    <IndexCard
      v-for="(indexCardData, index) in indexCardDataArray"
      :key="index"
      :index-card-data="indexCardData"
      :card-status-i-c="cardStatusID"
    ></IndexCard>
  </div>
</template>

<script>
import IndexCard from "@/components/IndexCard/IndexCard.vue";

export default {
  name: "IndexCardHandler",
  components: {
    IndexCard
  },
  props: {
    indexCardDataArray: Array,
    cardStatusID: String
  },
  data() {
    return {
      cardStatusIC: String,
      indexCardArray: null
    };
  }
};
</script>

<style scoped lang="scss"></style>
