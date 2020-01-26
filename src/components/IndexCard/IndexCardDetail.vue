<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" hide-footer>
      <template v-slot:modal-header="{}" :style="headerColor">
        <input
          id="companyInput"
          v-model="companyValue"
          v-autowidth="{ maxWidth: '960px', minWidth: '20px', comfortZone: 0 }"
          class="adressInput"
          placeholder="Firma"
          :disabled="disabled"
          :style="{ backgroundColor: `${getTextFieldBackground()}` }"
        />

        <b-button
          variant="danger"
          class="button button-close"
          @click="onCloseModal()"
          >x</b-button
        >
      </template>

      <div class="field-next">
        <div class="field-next">
          <div>
            <input
              v-model="streetValue"
              v-autowidth="{
                maxWidth: '960px',
                minWidth: '20px',
                comfortZone: 0
              }"
              placeholder="Straﬂe"
              :disabled="disabled"
              class="adressInput"
              :style="{
                backgroundColor: `${getTextFieldBackground()}`
              }"
            />
          </div>
          <div id="nr">
            <input
              v-model="houseNumberValue"
              v-autowidth="{
                maxWidth: '960px',
                minWidth: '20px',
                comfortZone: 0
              }"
              placeholder="Hausnr."
              :disabled="disabled"
              class="adressInput"
              :style="{
                backgroundColor: `${getTextFieldBackground()}`
              }"
            />
          </div>
        </div>
        <div id="iconedit">
          <font-awesome-icon
            v-if="!create"
            :icon="['fas', 'edit']"
            @click="disabled = !disabled"
          />
        </div>
      </div>
      <div class="field-next">
        <div>
          <input
            v-model="postCodeValue"
            v-autowidth="{
              maxWidth: '960px',
              minWidth: '20px',
              comfortZone: 0
            }"
            placeholder="PLZ"
            :disabled="disabled"
            class="adressInput"
            :style="{ backgroundColor: `${getTextFieldBackground()}` }"
          />
        </div>
        <div>
          <input
            v-model="cityValue"
            v-autowidth="{
              maxWidth: '960px',
              minWidth: '20px',
              comfortZone: 0
            }"
            placeholder="Ort"
            :disabled="disabled"
            class="adressInput"
            :style="{ backgroundColor: `${getTextFieldBackground()}` }"
          />
        </div>
      </div>
      <div>
        <input
          v-model="phoneValue"
          v-autowidth="{ maxWidth: '960px', minWidth: '20px', comfortZone: 0 }"
          placeholder="Telefon"
          :disabled="disabled"
          class="adressInput"
          :style="{ backgroundColor: `${getTextFieldBackground()}` }"
        />
      </div>

      <div>
        <div class="field-next">
          <div id="status-pick">
            <b-navbar-nav>
              <b-nav-item-dropdown
                class="dropdownClass"
                :text="currentStatusName"
                :style="{ backgroundColor: currentStatusColor }"
              >
                <b-dropdown-item
                  v-for="(status, i) in data.status"
                  :key="i"
                  :style="{ backgroundColor: status.color }"
                  @click="
                    detailHandleSelection(status.id, status.name, status.color)
                  "
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
          <div>
            <font-awesome-icon
              v-if="!create"
              id="icontrash"
              :icon="['fas', 'trash']"
              @click="removeIndexCard()"
            />

            <b-button
              id="but-OK"
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
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";

import VueInputAutowidth from "vue-input-autowidth";
Vue.use(VueInputAutowidth);

library.add([faEdit, faTrash]);

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
    name: "",
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
    this.init();
  },
  methods: {
    ...mapActions([
      "changeIndexCardData",
      "changeIndexCardStatus",
      "addNewIndexCard",
      "removeIndexCardById"
    ]),
    init() {
      if (this.create) {
        this.dateEl = new Date().toISOString();
        this.disabled = false;
        this.currentStatusName = "Status auswählen";
        this.currentStatusColor = "#eaeaea";
        this.companyValue = "";
        this.streetValue = "";
        this.houseNumberValue = "";
        this.postCodeValue = "";
        this.cityValue = "";
        this.phoneValue = "";

        return;
      }
      this.disabled = true;
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
    removeIndexCard() {
      this.$bvModal.hide(this.indexCardData.id);
      this.removeIndexCardById(this.indexCardData.id);
      window.location.reload();
    },
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
        changeData.id = this.ToolHandler.uuidv4();
        changeData.statusId = this.currentStatusId;
        this.addNewIndexCard(changeData);
        window.location.reload();
      }
      this.init();
      this.$bvModal.hide(this.indexCardData.id);
    },
    onCloseModal() {
      this.init();
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

#iconedit {
  position: right;
}

::v-deep.vdatetime input {
  width: 150px;
  padding-top: 1rem;
  padding-right: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
}

.adressInput {
  color: #495057;
  border: 0px solid #ced4da;
  border-radius: 0.5rem;
  height: calc(1.5em + 2px);
  padding: 0 0.3rem 0 0.3rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 4px;
  margin-right: 4px;
}
::v-deep.modal-body {
  padding: 1.2rem;
}
#companyInput {
  font-weight: bold;
  margin: 0px;
}

::v-deep a {
  color: white;
  font-size: 14px;
}

::v-deep a:hover {
  color: rgb(175, 170, 170);
}

#status-pick {
  padding-top: 23px;
  padding-bottom: 0px;
  height: 31px;
  line-height: 16px;
}

#but-OK {
  float: right;
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
  margin-left: 8px;
  margin-right: 20px;
}

.fa-trash {
  color: rgb(138, 139, 141);
  font-size: 1.7rem;
  padding: 0px;
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
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
#icontrash {
  margin: 0px;
  margin-top: 8px;
  margin-left: 4px;
}

.dropdownClass {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  margin-right: 10px;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}
</style>
