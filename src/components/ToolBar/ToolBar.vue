<template>
  <div class="toolBar">
    <b-navbar toggleable="lg" type="primary" variant="light">
      <div
        class="searchBar"
        :style="{
          backgroundColor: statusColor + '30'
        }"
      >
        <b-navbar-nav>
          <b-nav-item-dropdown
            :style="{
              backgroundColor: statusColor
            }"
            class="dropdownClass"
            :text="selectedStatusName"
          >
            <b-dropdown-item @click="handleSelection(allStates)"
              >Alle Status</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              v-for="(status, i) in statusData"
              :key="i"
              @click="handleSelection(status)"
            >
              <div class="statusListItemContainer">
                <div
                  class="circleClass"
                  :style="{
                    backgroundColor: status.color
                  }"
                ></div>
                <div>{{ status.name }}</div>
              </div>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="$bvModal.show('createNewStatus')">
              <font-awesome-icon class="addIcon" icon="plus" />Status
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-form>
            <b-form-input
              v-model="companySearchValue"
              size="sm"
              placeholder="Firma"
              class="mr-sm-2"
              @keyup="handleSearch()"
            ></b-form-input>
          </b-nav-form>
          <b-nav-form>
            <b-form-input
              v-model="streetSearchValue"
              size="sm"
              placeholder="Straße"
              class="mr-sm-2"
              @keyup="handleSearch()"
            ></b-form-input>
          </b-nav-form>
          <b-nav-form>
            <b-form-input
              v-model="citySearchValue"
              placeholder="Ort"
              size="sm"
              class="mr-sm-2"
              @keyup="handleSearch()"
            ></b-form-input>
          </b-nav-form>
          <b-nav-form>
            <date-pick
              id="dateElementInputField"
              v-model="dateSearchValue"
              :weekdays="weekdays"
              :months="month"
              :display-format="'DD.MM.YYYY'"
            ></date-pick>
          </b-nav-form>
          <b-nav-form>
            <date-pick
              id="firstVisitElementInputField"
              v-model="firstVisitSearchValue"
              :months="month"
              :weekdays="weekdays"
              :display-format="'DD.MM.YYYY'"
              @click="handleSearch()"
            ></date-pick>
          </b-nav-form>
        </b-navbar-nav>
      </div>

      <b-button class="addButtonClass" variant="outline-primary">
        <font-awesome-icon class="addIcon" icon="plus" />Neuer Kunde
      </b-button>
    </b-navbar>
    <new-status></new-status>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePick from "vue-date-pick";
import NewStatus from "@/components/NewStatus/NewStatus.vue";
//import "vue-date-pick/dist/vueDatePick.css";
import "./vueDatePick.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add([faPlus]);

export default {
  name: "ToolBar",
  components: { DatePick, NewStatus },
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
      statusColor: "",
      selectedStatusData: null,
      companySearchValue: "",
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
  computed: {
    ...mapGetters(["allStates"])
  },
  watch: {
    firstVisitSearchValue: function() {
      this.handleSearch();
    },
    dateSearchValue: function() {
      this.handleSearch();
    },
    statusData: function() {
      if (this.statusData.length) {
        this.handleSelection(this.allStates);
      }
    }
  },
  mounted: function() {
    // selection of first status value
    if (this.statusData.length) {
      this.handleSelection(this.allStates);
    }

    document
      .getElementById("dateElementInputField")
      .firstElementChild.setAttribute("placeholder", "Termin");

    document
      .getElementById("firstVisitElementInputField")
      .firstElementChild.setAttribute("placeholder", "Erster Besuch");
  },
  methods: {
    handleSelection(selectedData) {
      //clear search inputs
      this.companySearchValue = "";
      this.streetSearchValue = "";
      this.citySearchValue = "";
      this.dateSearchValue = "";
      this.firstVisitSearchValue = "";

      this.statusColor = selectedData.color;
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
      if (
        indexCardData.company
          .toLowerCase()
          .indexOf(this.companySearchValue.toLowerCase()) === -1
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

.form-control {
  color: #495057;
  background-color: #f5f5f5;
  border: 0px solid #ced4da;
}
.form-control-sm {
  border-radius: 0.5rem;
}

.toolbarTextLabelClass {
  margin-left: 0.5rem !important;
}

.bg-light {
  background-color: #ffffff !important;
  margin-bottom: 10px;
  box-shadow: 0px 0px 7px 1px rgba(179, 179, 179, 0.18);
}

#dateElementInputField input {
  border: 0px solid #ced4da !important;
}

.circleClass {
  margin-top: 6.5px;
  margin-right: 7px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: #ccc;
}

.statusListItemContainer {
  display: flex;
}

.dropdownClass {
  border-bottom-left-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  background-color: #007bff;
  // height: 31px;
  margin-right: 10px;
}

::v-deep .dropdownClass .nav-link {
  color: white !important;
  // line-height: 14px;
}

.addIcon {
  margin-right: 5px;
}

.searchBar {
  display: flex;
  background-color: #007bff30;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.addButtonClass {
  margin-left: auto;
}
</style>
