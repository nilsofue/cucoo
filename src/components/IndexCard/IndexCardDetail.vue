<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" hide-footer>
      <template v-slot:modal-header="{ close }" :style="headerColor">
        <b-form-input
          id="companyInput"
          v-model="companyValue"
          placeholder="Firma"
          :disabled="disabled"
          class="adressInput"
          :style="{ backgroundColor: `${getTextFieldBackground()}` }"
        ></b-form-input>
        <b-button
          size="sm"
          variant="outline-danger"
          class="button button-close"
          @click="close()"
          >x
        </b-button>
      </template>

      <div class="field-next">
        <div class="field-next">
          <div>
            <b-form-input
              v-model="streetValue"
              placeholder="Straße"
              :disabled="disabled"
              class="adressInput"
              :style="{
                backgroundColor: `${getTextFieldBackground()}`
              }"
            ></b-form-input>
          </div>
          <div id="nr">
            <b-form-input
              v-model="houseNumberValue"
              placeholder="Hausnr."
              :disabled="disabled"
              class="adressInput"
              :style="{
                backgroundColor: `${getTextFieldBackground()}`
              }"
            ></b-form-input>
          </div>
        </div>
        <div>
          <font-awesome-icon
            v-if="!create"
            :icon="['fas', 'edit']"
            @click="disabled = !disabled"
          />
        </div>
      </div>
      <div class="field-next">
        <div>
          <b-form-input
            v-model="postCodeValue"
            placeholder="PLZ"
            :disabled="disabled"
            class="adressInput"
            :style="{
              backgroundColor: `${getTextFieldBackground()}`
            }"
          ></b-form-input>
        </div>
        <div>
          <b-form-input
            v-model="cityValue"
            placeholder="Ort"
            :disabled="disabled"
            class="adressInput"
            :style="{
              backgroundColor: `${getTextFieldBackground()}`
            }"
          ></b-form-input>
        </div>
      </div>
      <div>
        <b-form-input
          v-model="phoneValue"
          placeholder="Telefon"
          :disabled="disabled"
          class="adressInput"
          :style="{
            backgroundColor: `${getTextFieldBackground()}`
          }"
        ></b-form-input>
      </div>

      <div>
        <div class="field-next">
          <div id="status-pick">
            <b-navbar-nav>
              <b-nav-item-dropdown
                class="nav-item"
                :text="currentStatusName"
                :style="{
                  backgroundColor: currentStatusColor
                }"
              >
                <b-dropdown-item
                  v-for="(status, i) in data.status"
                  :key="i"
                  :style="{
                    backgroundColor: status.color
                  }"
                  @click="detailHandleSelection(status.id, status.name)"
                  >{{ status.name }}</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </div>
          <div>
            <div id="dropdownTermin">
              <div>
                Termin
                <br />
                <div>
                  <datetime v-model="dateEl" type="datetime"></datetime>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="tab-Notice">
        <div>
          <NoticeComponent
            v-if="!create"
            :notice-data-array="indexCardData.notes"
            :index-card-id="indexCardData.id"
            :edit-mode="true"
          ></NoticeComponent>
        </div>
        <div>
          <div id="but-OK">
            <b-button
              :disabled="!currentStatusId"
              variant="primary"
              @click="saveChanges()"
              >OK</b-button
            >
          </div>
        </div>
      </div>
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
    },
    bgColor: {
      type: String,
      default: "#0099CC"
    }
  },
  data: () => ({
    dateEl: "",
    companyValue: "",
    streetValue: "",
    houseNumberValue: "",
    postCodeValue: "",
    cityValue: "",
    phoneValue: "",
    currentStatusId: "",
    currentStatusName: "",
    currentStatusColor: "",
    disabled: true
  }),
  computed: {
    ...mapGetters(["getStatusDataByIndexCardId", "data"]),

    headerColor() {
      return {
        "background-color": this.bgColor
      };
    }
  },
  mounted() {
    if (this.create) {
      this.dateEl = new Date().toISOString();
      this.disabled = false;
      this.currentStatusName = "Status auswählen";

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
    getTextFieldBackground() {
      return this.disabled ? "white" : "#eaeaea";
    },
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
      this.$bvModal.hide(this.indexCardData.id);
    }
  }
};

// timestamp: new Date().getTime()
</script>

<style scoped lang="scss">
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

::v-deep.vdpComponent.vdpWithInput input {
  width: 128px;
  margin-left: 0rem !important;
}

.adressInput {
  color: #495057;
  border: 0px solid #ced4da;
  border-radius: 0.5rem;
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 8px;
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

::v-deep .vdatetime input {
  color: #495057;
  background-color: #eaeaea;
  border: 0px solid #ced4da;
  border-radius: 0.5rem;
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}
.fa-edit {
  color: rgb(45, 141, 196);
  font-size: 1.7rem;
  padding: 0px;
  margin-bottom: 8px;
}

#tab-Notice {
  margin-top: 1rem;
}

.field-next {
  display: flex;
}

#id {
  width: 10%;
}
</style>
