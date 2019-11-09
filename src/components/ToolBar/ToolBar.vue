<template>
  <div class="toolBar">
    <b-navbar toggleable="lg" type="primary" variant="light">
      <b-navbar-nav>
        <b-nav-item-dropdown :text="selectedStatusName">
          <b-dropdown-item
            v-for="(status, i) in statusData"
            :key="i"
            @click="handleSelection(status)"
            >{{ status.name }}</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-nav-text class="toolbarTextLabelClass">Straße:</b-nav-text>
          <b-form-input
            v-model="streetSearchValue"
            size="sm"
            class="mr-sm-2"
            @keyup="handleSearch()"
          ></b-form-input>
        </b-nav-form>
        <b-nav-form>
          <b-nav-text class="toolbarTextLabelClass">Ort:</b-nav-text>
          <b-form-input
            v-model="citySearchValue"
            size="sm"
            class="mr-sm-2"
            @keyup="handleSearch()"
          ></b-form-input>
        </b-nav-form>
        <b-nav-form>
          <b-nav-text class="toolbarTextLabelClass">Termin:</b-nav-text>
          <date-pick
            v-model="dateSearchValue"
            :weekdays="weekdays"
            :months="month"
            :display-format="'DD.MM.YYYY'"
          ></date-pick>
        </b-nav-form>
        <b-nav-form>
          <b-nav-text class="toolbarTextLabelClass">Erster Besuch:</b-nav-text>
          <date-pick
            v-model="firstVisitSearchValue"
            :months="month"
            :weekdays="weekdays"
            :display-format="'DD.MM.YYYY'"
            @click="handleSearch()"
          ></date-pick>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
//import "vue-date-pick/dist/vueDatePick.css";
import "./vueDatePick.css";

export default {
  name: "ToolBar",
  components: { DatePick },
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
      firstVisitSearchValue: "",
      weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      month: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ]
    };
  },
  watch: {
    firstVisitSearchValue: function() {
      this.handleSearch();
    },
    dateSearchValue: function() {
      this.handleSearch();
    }
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
      if (!this.isSameDate(this.dateSearchValue, indexCardData.date))
        return false;
      if (
        !this.isSameDate(this.firstVisitSearchValue, indexCardData.createTime)
      )
        return false;
      return true;
    },
    isSameDate(selectedDate, indexCardDate) {
      if (!selectedDate || !indexCardDate) return true;
      selectedDate = new Date(selectedDate);
      indexCardDate = new Date(indexCardDate);
      let selectedDateDay = selectedDate.getDate();
      let selectedDateMonth = selectedDate.getMonth();
      let selectedDateYear = selectedDate.getFullYear();
      let indexCardDateDay = indexCardDate.getDate();
      let indexCardDateMonth = indexCardDate.getMonth();
      let indexCardDateYear = indexCardDate.getFullYear();

      if (
        selectedDateDay === indexCardDateDay &&
        selectedDateMonth === indexCardDateMonth &&
        selectedDateYear === indexCardDateYear
      )
        return true;
      else return false;
    }
  }
};
</script>

<style scoped lang="scss">
.mr-sm-2 {
  width: 120px !important;
  margin-left: 0.5rem !important;
}

.toolbarTextLabelClass {
  margin-left: 0.5rem !important;
}
</style>
