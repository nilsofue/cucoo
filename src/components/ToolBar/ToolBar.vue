<template>
  <div class="toolBar">
    <b-navbar toggleable="lg" type="primary" variant="light">
      <b-navbar-nav>
        <b-nav-item-dropdown :text="selectedStatus">
          <b-dropdown-item
            v-for="(status, i) in statusData"
            :key="i"
            @click="
              $emit('update-Index-Cards', status.entries);
              handleSelection(status);
            "
            >{{ status.name }}</b-dropdown-item
          >
        </b-nav-item-dropdown>
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
    console.log(this.statusData);
  },
  methods: {
    handleSelection(selectedData) {
      this.selectedStatus = selectedData.name;
    }
  }
};
</script>

<style scoped lang="scss"></style>
