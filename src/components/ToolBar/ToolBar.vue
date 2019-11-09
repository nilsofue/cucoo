<template>
  <div class="toolBar">
    <b-navbar toggleable="lg" type="primary" variant="light">
      <b-navbar-nav>
        <b-nav-item-dropdown :text="selectedStatusName">
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
          <b-form-input
            v-model="streetSearchValue"
            size="sm"
            class="mr-sm-2"
            @keyup="handleSearch()"
          ></b-form-input>
        </b-nav-form>
        <b-nav-form>
          <b-nav-text>Ort:</b-nav-text>
          <b-form-input v-model="citySearchValue" size="sm" class="mr-sm-2" @keyup="handleSearch()"></b-form-input>
        </b-nav-form>
        <b-nav-form>
          <b-nav-text>Termin:</b-nav-text>
          <b-form-input v-model="dateSearchValue" size="sm" class="mr-sm-2" @keyup="handleSearch()"></b-form-input>
        </b-nav-form>
        <b-nav-form>
          <b-nav-text>Erster Besuch:</b-nav-text>
          <b-form-input
            v-model="firstVisitSearchValue"
            size="sm"
            class="mr-sm-2"
            @keyup="handleSearch()"
          ></b-form-input>
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
      selectedStatusName: "Status",
      selectedStatusData: null,
      streetSearchValue: "",
      citySearchValue: "",
      dateSearchValue: "",
      firstVisitSearchValue: ""
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
      console.log("clear");
      //clear search inputs
      this.streetSearchValue = "";
      this.citySearchValue = "";
      this.dateSearchValue = "";
      this.firstVisitSearchValue = "";

      this.selectedStatusData = selectedData;
      this.selectedStatusName = selectedData.name;
      this.$emit("update-Index-Cards", selectedData.entries);
    },
    handleSearch() {
      this.$emit(
        "update-Index-Cards",
        this.selectedStatusData.entries.filter(this.filterElements)
      );
    },
    filterElements(indexCardData) {
      console.log(indexCardData);
      if (
        indexCardData.adress.city
          .toLowerCase()
          .indexOf(this.citySearchValue.toLowerCase()) === -1
      )
        return false;
      if (
        indexCardData.adress.street
          .toLowerCase()
          .indexOf(this.streetSearchValue.toLowerCase()) === -1
      )
        return false;
      return true;
    }
  }
};
</script>

<style scoped lang="scss"></style>
