<template>
  <div class="overview">
    <ToolBar
      :status-data="data.status"
      @update-Index-Cards="updateIndexCards"
      @update-Card-Status="updateCardStatus"
    />
    <IndexCardHandler
      :index-card-data-array="indexCardArray"
      :card-status-i-d="cardStatus"
    />
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
      cardStatus: String,
      indexCardArray: null
    };
  },
  mounted() {
    this.DataHandler.getData().then(result => (this.data = result));
  },
  methods: {
    updateIndexCards(indexCardArray) {
      this.indexCardArray = indexCardArray;
    },
    updateCardStatus(id) {
      this.cardStatus = id;
    }
  }
};
</script>
