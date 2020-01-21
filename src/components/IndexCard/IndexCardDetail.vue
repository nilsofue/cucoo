<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id">
      <b-form-input v-model="companyValue" class="adressInput"></b-form-input>
      <table id="myTable">
        <tr>
          <td id="tabRowLeft">
            <div>
              <b-form-input
                v-model="streetValue"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="houseNumberValue"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="postCodeValue"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="cityValue"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="phoneValue"
                class="adressInput"
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
              <b-nav-item-dropdown class="nav-item" :text="currentStatusName">
                <b-dropdown-item
                  v-for="(status, i) in data.status"
                  :key="i"
                  @click="detailHandleSelection(status.id, status.name)"
                  >{{ status.name }}</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </td>
        </tr>
      </table>

      <b-button variant="outline-primary" @click="saveChanges()">Save</b-button>

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
import { mapGetters, mapActions } from "vuex";
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
    },
    create: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data: () => ({
    dateAppointment: "",
    companyValue: "",
    streetValue: "",
    houseNumberValue: "",
    postCodeValue: "",
    cityValue: "",
    phoneValue: "",
    currentStatusId: "",
    currentStatusName: ""
  }),
  computed: {
    ...mapGetters(["getStatusDataByIndexCardId", "data"])
  },
  mounted() {
    if (this.create) {
      this.dateAppointment = new Date().toString();
      // console.log(this.data.status[0]);
      // let statusData = this.data.status;
      // this.currentStatusId = statusData.id;
      // this.currentStatusName = statusData.name;
      return;
    }
    this.dateAppointment = new Date(this.indexCardData.date).toString();
    this.companyValue = this.indexCardData.company;
    this.streetValue = this.indexCardData.adress.street;
    this.houseNumberValue = this.indexCardData.adress.houseNumber;
    this.postCodeValue = this.indexCardData.adress.postCode;
    this.cityValue = this.indexCardData.adress.city;
    this.phoneValue = this.indexCardData.phone;
    let statusData = this.getStatusDataByIndexCardId(this.indexCardData.id);
    this.currentStatusId = statusData.id;
    this.currentStatusName = statusData.name;
  },
  methods: {
    ...mapActions([
      "changeIndexCardData",
      "changeIndexCardStatus",
      "addNewIndexCard"
    ]),
    detailHandleSelection(statusId, statusName) {
      this.currentStatusId = statusId;
      this.currentStatusName = statusName;
    },
    saveChanges() {
      let changeData = {
        id: this.indexCardData.id,
        date: new Date(this.dateAppointment).getTime(),
        company: this.companyValue,
        adress: {
          street: this.streetValue,
          houseNumber: this.houseNumberValue,
          postCode: this.postCodeValue,
          city: this.cityValue
        },
        phone: this.phoneValue
      };

      if (!this.create) {
        this.changeIndexCardData(changeData);
        this.changeIndexCardStatus({
          statusId: this.currentStatusId,
          indexCardId: this.indexCardData.id
        });
      } else {
        changeData.id = this.DataHandler.uuidv4();
        changeData.statusId = this.currentStatusId;
        this.addNewIndexCard(changeData);
      }
    }
  }
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
