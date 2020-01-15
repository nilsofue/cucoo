<template>
  <div class="newStatus">
    <b-modal id="createNewStatus" title="Neuen Status anlegen" hide-footer>
      <div>
        <table>
          <tr>
            <td>Bezeichnung:</td>
            <td>
              <b-form-input
                v-model="statusName"
                placeholder="Bezeichnung eingeben"
              ></b-form-input>
            </td>
          </tr>
          <tr>
            <td>Farbe des Status:</td>
            <td>
              <verte picker="wheel" value="#f0f"></verte>
            </td>
          </tr>
        </table>
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

<style></style>
