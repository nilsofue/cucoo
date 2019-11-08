<template>
  <div class="overview">
    <ToolBar />
    <IndexCardHandler :incoming-data="importedData" />
  </div>
</template>

<script>
//@ is an alias to /src
import ToolBar from "@/components/ToolBar/ToolBar.vue";
import IndexCardHandler from "@/components/IndexCard/IndexCardHandler.vue";
import originData from "@/sampleData.json";

export default {
  name: "Overview",
  components: {
    ToolBar,
    IndexCardHandler
  },

  data() {
    return {
      importedData: originData
    };
  }
};
</script>
