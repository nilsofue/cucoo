<template>
  <div class="newStatus">
    <b-modal id="createNewStatus" title="Neuen Status anlegen" hide-footer>
      <div>
        <div class="itemsClass">
          <b-form-input
            v-model="statusName"
            class="statusNameInput"
            placeholder="Status-Bezeichnung eingeben"
          ></b-form-input>

          <div class="swatchesClass">
            <swatches v-model="colorValue" shapes="circles" />
          </div>
        </div>

        <div class="buttonClass">
          <b-button
            :disabled="isStatusNameAndColorEmpty()"
            variant="primary"
            @click="saveData()"
            >Speichern</b-button
          >
          <b-button
            class="discardButtonClass"
            variant="outline-danger"
            @click="onClose()"
            >Verwerfen</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css";

export default {
  name: "NewStatus",
  components: { Swatches },
  data() {
    return {
      statusName: "",
      colorValue: ""
    };
  },
  methods: {
    ...mapActions(["addNewStatus"]),
    saveData() {
      this.addNewStatus({
        color: this.colorValue,
        name: this.statusName,
        id: this.DataHandler.uuidv4()
      });
      this.onClose();
    },
    isStatusNameAndColorEmpty() {
      return (
        !this.statusName ||
        0 === this.statusName.length ||
        (!this.colorValue || 0 === this.colorValue.length)
      );
    },
    onClose() {
      this.$bvModal.hide("createNewStatus");
      this.colorValue = "";
      this.statusName = "";
    }
  }
};
</script>

<style>
.buttonClass {
  display: flex;
  margin-top: 30px;
}

.discardButtonClass {
  margin-left: 20px;
}

#createNewStatus {
  border-radius: 0.5rem;
}
.itemsClass {
  display: flex;
}

.statusNameInput {
  width: 70%;
  margin-right: 58px;
}

.swatchesClass {
  margin-right: 38px;
}
</style>
