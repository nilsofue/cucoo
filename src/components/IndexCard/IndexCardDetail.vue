<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company">
      <table id="myTable">
        <tr>
          <td id="tabRowLeft">
            <div>
              <b-form-input
                v-model="streetValue"
                class="adressInput"
                :placeholder="indexCardData.adress.street"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="houseNumberValue"
                class="adressInput"
                :placeholder="indexCardData.adress.houseNumber"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="postCodeValue"
                class="adressInput"
                :placeholder="indexCardData.adress.postCode"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="cityValue"
                class="adressInput"
                :placeholder="indexCardData.adress.city"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="phoneValue"
                class="adressInput"
                :placeholder="indexCardData.phone"
              ></b-form-input>
            </div>
            <br />
          </td>
          <td>
            <div id="dropdownTermin">
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
            </div>
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
    dateAppointment: "2019-01-01 14:30",
    streetValue: "",
    houseNumberValue: "",
    postCodeValue: "",
    cityValue: "",
    phoneValue: ""
  }),

  mounted() {
    this.dateAppointment = new Date(this.indexCardData.date).toString();
    this.streetValue = this.indexCardData.adress.street;
    this.houseNumberValue = this.indexCardData.adress.houseNumber;
    this.postCodeValue = this.indexCardData.adress.postCode;
    this.cityValue = this.indexCardData.adress.city;
    this.phoneValue = this.indexCardData.phone;
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
table {
  width: 100%;
}

#tabRowLeft {
  width: 50%;
}

#dateAppEl {
  margin-top: 5%;
  margin-bottom: 5%;
}

#dropdownTermin {
  margin-top: 0px;
  margin-left: 5%;
}

.adressInput {
  margin-bottom: 2%;
  margin-right: 2%;
}

::v-deep .vdpClearInput {
  visibility: hidden;
}
::v-deep .btn-secondary {
  visibility: hidden;
}

::v-deep.vdpComponent.vdpWithInput input {
  width: 180px;
  margin-left: 0rem !important;
}
</style>
