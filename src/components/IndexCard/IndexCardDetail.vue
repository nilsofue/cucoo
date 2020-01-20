<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company">
      <table id="myTable">
        <tr>
          <td>
            <p>
              {{ indexCardData.adress.street }}
              {{ indexCardData.adress.houseNumber }}
              <br />
              {{ indexCardData.adress.postCode }}
              {{ indexCardData.adress.city }}
              <br />
              {{ indexCardData.phone }}
            </p>
          </td>
          <td id="dropdownTermin">
            <div>
              Termin
              <br />
            </div>
            <b-navbar-nav>
              <b-nav-form>
                <date-pick
                  id="dateAppEl"
                  v-model="dateAppointment"
                  :pick-time="true"
                  :format="'YYYY-MM-DD HH:mm'"
                ></date-pick>
              </b-nav-form>
            </b-navbar-nav>
          </td>
        </tr>

        <tr>
          <td>
            <b-navbar-nav>
              <b-nav-item-dropdown
                class="nav-item"
                :text="getStatusDataByIndexCardId(indexCardData.id).name"
              >
                <b-dropdown-item
                  v-for="(status, i) in data.status"
                  :key="i"
                  @click="detailHandleSelection(status.id)"
                >
                  {{ status.name }}
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </td>
        </tr>
      </table>

      <NoticeComponent
        :notice-data-array="indexCardData.notes"
        :index-card-id="indexCardData.id"
        :edit-mode="true"
      ></NoticeComponent>
    </b-modal>
  </div>
</template>

<script>
import NoticeComponent from "@/components/IndexCard/NoticeComponent.vue";
import { mapGetters } from "vuex";
import DatePick from "vue-date-pick";

export default {
  name: "IndexCardDetail",
  components: {
    NoticeComponent,
    DatePick
  },
  props: {
    indexCardData: {
      type: Object,
      default: () => {
        return {
          date: 0
        };
      }
    }
  },
  data: () => ({
    dateAppointment: "2019-01-01 14:30"
  }),

  mounted() {
    this.dateAppointment = new Date(this.indexCardData.date).toString();
  },
  computed: {
    ...mapGetters(["getStatusDataByIndexCardId", "data"])
  }
  /*methods: {
    detailHandleSelection(selectedStatusID) {
      //clear search inputs
      this.companyIDDetail = indexCardData.id;
      this.streetNameDetail = indexCardData.name;
      this.streetNameDetail = indexCardData.name;
      this.citySearchValue = "";
      this.dateSearchValue = "";
      this.firstVisitSearchValue = "";

      this.statusColor = selectedData.color;
      this.selectedStatusData = selectedData;
      this.selectedStatusName = selectedData.name;
    }
  }*/
};

// timestamp: new Date().getTime()
</script>

<style scoped lang="scss">
footer {
  margin-top: 5%;
}

table {
  width: 100%;
}

th {
  width: 50%;
  background-color: grey;
}

#dateAppEl {
  margin-top: 5%;
  margin-bottom: 5%;
}

::v-deep .vdpClearInput {
  visibility: hidden;
}
::v-deep .btn-secondary {
  visibility: hidden;
}
</style>
