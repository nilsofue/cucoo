<template>
  <div class="overview">
    <ToolBar
      :status-data="data.status"
      @update-Index-Cards="updateIndexCards"
    />
    <div v-if="loading" class="loadingSpinner">
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Overview",
  components: {
    ToolBar,
    IndexCardHandler
  },
  data() {
    return {
      indexCardArray: null
    };
  },
  mounted() {
    /*     this.DataHandler.getData().then(result => {
      this.loading = false;
      this.data = result;
    }); */
    this.getData();
  },
  methods: {
    ...mapActions(["getData"]),
    updateIndexCards(indexCardArray) {
      this.indexCardArray = indexCardArray;
    }
  },
  computed: {
    ...mapGetters(["data", "loading"])
  }
};
</script>

<style>
.loadingSpinner {
  text-align: center;
  padding: 40px;
}
</style>
