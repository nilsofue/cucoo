<template>
  <div class="toolBar">
    <b-navbar toggleable="lg" type="primary" variant="light">
      <b-navbar-nav>
        <b-nav-item-dropdown :text="selectedStatus">
          <b-dropdown-item
            v-for="(status, i) in statusData"
            :key="i"
            @click="
              handleSelection(status);
            "
          >{{ status.name }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-form>
          <b-nav-text>Straße:</b-nav-text>
          <b-form-input size="sm" class="mr-sm-2"></b-form-input>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    statusData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      selectedStatus: "Status"
    };
  },
  mounted: function() {
    // selection of first status value
    if (this.statusData.length) {
      this.handleSelection(this.statusData[0]);
    }
  },
  methods: {
    handleSelection(selectedData) {
      this.selectedStatus = selectedData.name;
      this.$emit("update-Index-Cards", selectedData.entries);
    }
  }
};
</script>

<style scoped lang="scss"></style>
