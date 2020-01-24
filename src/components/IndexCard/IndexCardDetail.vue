<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" hide-footer>
      <table id="myTable">
        <tr>
          <td id="tabRowLeft">
            <b-form-input
              id="companyInput"
              v-model="companyValue"
              :disabled="disabled"
              class="adressInput"
            ></b-form-input>
          </td>
          <td>
            <font-awesome-icon
              :icon="['fas', 'edit']"
              @click="disabled = !disabled"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <b-form-input
                v-model="streetValue"
                :disabled="disabled"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="houseNumberValue"
                :disabled="disabled"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="postCodeValue"
                :disabled="disabled"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="cityValue"
                :disabled="disabled"
                class="adressInput"
              ></b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="phoneValue"
                :disabled="disabled"
                class="adressInput"
              ></b-form-input>
            </div>
          </td>
        </tr>

        <tr>
          <td id="status-pick">
            <b-navbar-nav>
              <b-nav-item-dropdown class="nav-item" :text="currentStatusName">
                <b-dropdown-item
                  v-for="(status, i) in data.status"
                  :key="i"
                  @click="
                    detailHandleSelection(status.id, status.name, status.color)
                  "
                  >{{ status.name }}</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </td>
          <td>
            <div id="dropdownTermin">
              <div>
                Termin
                <br />
                <div>
                  <datetime
                    :id="indexCardData.id + 'DatePick'"
                    v-model="dateEl"
                    type="datetime"
                  ></datetime>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <NoticeComponent
            :notice-data-array="indexCardData.notes"
            :index-card-id="indexCardData.id"
            :edit-mode="true"
          ></NoticeComponent>
        </tr>
        <tr>
          <div id="but-OK">
            <b-button variant="primary" @click="saveChanges()">OK</b-button>
          </div>
        </tr>
      </table>
    </b-modal>
  </div>
</template>

<script>
import NoticeComponent from "@/components/IndexCard/NoticeComponent.vue";
import { mapGetters, mapActions } from "vuex";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit);

export default {
  name: "IndexCardDetail",
  components: {
    NoticeComponent,
    Datetime
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
    date123: "2019-01-01 14:30",
    dateEl: "2019-01-01 14:30",
    dateElem: "2019-03-03 13:33",
    companyValue: "",
    streetValue: "",
    houseNumberValue: "",
    postCodeValue: "",
    cityValue: "",
    phoneValue: "",
    currentStatusId: "",
    currentStatusName: "",
    disabled: true
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
    this.dateEl = new Date(this.indexCardData.date).toISOString();
    this.companyValue = this.indexCardData.company;
    this.streetValue = this.indexCardData.adress.street;
    this.houseNumberValue = this.indexCardData.adress.houseNumber;
    this.postCodeValue = this.indexCardData.adress.postCode;
    this.cityValue = this.indexCardData.adress.city;
    this.phoneValue = this.indexCardData.phone;
    let statusData = this.getStatusDataByIndexCardId(this.indexCardData.id);
    this.currentStatusId = statusData.id;
    this.currentStatusName = statusData.name;
    this.currentStatusColor = statusData.color;
  },
  methods: {
    ...mapActions([
      "changeIndexCardData",
      "changeIndexCardStatus",
      "addNewIndexCard"
    ]),

    detailHandleSelection(statusId, statusName, statusColor) {
      this.currentStatusId = statusId;
      this.currentStatusName = statusName;
      this.currentStatusColor = statusColor;
    },
    saveChanges() {
      let changeData = {
        id: this.indexCardData.id,
        date: new Date(this.dateEl).getTime(),
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

#dropdownTermin {
  margin-top: 0px;
  margin-left: 5%;
}

.adressInput {
  margin-bottom: 2%;
  margin-right: 2%;
  background-color: white;
  border-color: white;
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

::v-deep.adressInput.form-control:disabled {
  background-color: white;
  border-color: white;
  margin-bottom: 2px;
  padding: 0px;
  height: calc(1.5em + 2px);
}
::v-deep.adressInput.form-control {
  background-color: rgb(245, 245, 245);
  margin-bottom: 2px;
  padding: 0px;
  padding-left: 2px;
  height: calc(1.5em + 2px);
}
::v-deep.modal-body {
  padding: 1.5rem;
}
#companyInput {
  font-weight: bold;
}

::v-deep.nav-link {
  padding-top: 2.1rem;
}

#status-pick {
  padding-top: 1.2rem;
  padding-bottom: 0px;
}

#but-OK {
  float: right;
  margin-left: -50%;
  margin-top: 0.5rem;
}
</style>
