<template>
  <div class="newStatus">
    <b-modal id="createNewStatus" title="Neuen Status anlegen" hide-footer>
      <div>
        <table>
          <tr>
            <td height="50">Bezeichnung:</td>
            <td>
              <b-form-input
                v-model="statusName"
                placeholder="Bezeichnung eingeben"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td height="50">Farbe des Status:</td>
            <td></td>
          </tr>
        </table>

        <div class="buttonClass">
          <b-button
            :disabled="isStatusNameEmpty()"
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

export default {
  name: "NewStatus",
  components: {},
  data() {
    return {
      statusName: "",
      colorValue: "#f0f"
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
    isStatusNameEmpty() {
      return !this.statusName || 0 === this.statusName.length;
    },
    onClose() {
      this.$bvModal.hide("createNewStatus");
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
</style>
