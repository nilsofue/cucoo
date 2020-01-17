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
            <td>
              <verte picker="wheel" value="#f0f"></verte>
            </td>
          </tr>
        </table>

        <div class="buttonClass">
          <b-button variant="primary">Speichern</b-button>
          <b-button class="discardButtonClass" variant="outline-danger"
            >Verwerfen</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Verte from "verte";
import "verte/dist/verte.css";

export default {
  name: "NewStatus",
  components: { Verte },
  data() {
    return {
      statusName: ""
    };
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
