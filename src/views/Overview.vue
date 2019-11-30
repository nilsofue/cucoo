<template>
  <div class="overview">
    <ToolBar :status-data="data.status" @update-Index-Cards="updateIndexCards" />
    <div class="loadingSpinner" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
      <p>Lade Daten...</p>
    </div>
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
      indexCardArray: null,
      loading: true
    };
  },
  mounted() {
    this.DataHandler.getData().then(result => {
      this.loading = false;
      this.data = result;
    });
  },
  methods: {
    updateIndexCards(indexCardArray) {
      this.indexCardArray = indexCardArray;
    }
  }
};
</script>

<style>
.loadingSpinner {
  text-align: center;
  padding: 40px;
}
</style>