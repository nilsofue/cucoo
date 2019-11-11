<template>
  <div class="overview">
    <ToolBar :status-data="data.status" @update-Index-Cards="updateIndexCards" />
    <IndexCardHandler :index-card-data-array="indexCardArray" />
  </div>
</template>

<script>
//@ is an alias to /src
import ToolBar from "@/components/ToolBar/ToolBar.vue";
import IndexCardHandler from "@/components/IndexCard/IndexCardHandler.vue";

export default {
  name: "Overview",
  components: {
    ToolBar,
    IndexCardHandler
  },
  data() {
    return {
      data: {},
      indexCardArray: null
    };
  },
  mounted() {
    this.DataHandler.getData().then(result => (this.data = result));
  },
  methods: {
    updateIndexCards(indexCardArray) {
      this.indexCardArray = indexCardArray;
    }
  }
};
</script>
