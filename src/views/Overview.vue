<template>
  <div class="overview">
    <ToolBar />
    <IndexCardHandler />
  </div>
</template>

<script>
//@ is an alias to /src
import ToolBar from "@/components/ToolBar.vue";
import IndexCardHandler from "@/components/IndexCard/IndexCardHandler.vue";

export default {
  name: "Overview",
  components: {
    ToolBar,
    IndexCardHandler
  }
};
</script>
