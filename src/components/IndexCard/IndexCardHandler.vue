<template>
  <div class="indexCardHandler">
    <IndexCard v-for="n in 10" v-bind:key="n"></IndexCard>
  </div>
</template>

<script>
import IndexCard from "@/components/IndexCard/IndexCard.vue";

export default {
  name: "IndexCardHandler",
  components: {
    IndexCard
  },
  props: {}
};
</script>

<style scoped lang="scss"></style>
