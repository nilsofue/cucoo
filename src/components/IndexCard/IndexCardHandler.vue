<template>
  <div class="indexCardHandler">
    <IndexCard v-for="n in 10" :key="n"></IndexCard>
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
    incomingData: {
      type: Object,
      required: true
    }
  },
  created: function() {
    console.log(this.incomingData);
    //console.log(this.incomingData.status[0].entries);
  }
};
</script>

<style scoped lang="scss"></style>
