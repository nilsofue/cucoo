<template>
  <div class="indexCardHandler">
    <IndexCard />
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
