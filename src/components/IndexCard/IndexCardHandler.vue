<template>
  <div class="indexCardHandler">
    <IndexCard
      v-for="(indexCardData, index) in indexCardDataArray"
      :key="index"
      :index-card-data="indexCardData"
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
    indexCardDataArray: Array
  }
};
</script>

<style scoped lang="scss">
.indexCardHandler {
  display: inline-block;
  width: 100%;
}
</style>
