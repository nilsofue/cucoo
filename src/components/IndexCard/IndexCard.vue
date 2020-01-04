<template>
  <div class="indexCard" @click="openModal">
    <b-card>
      <b-card-text>
        <h5>{{ indexCardData.company }}</h5>
        <table class="infoTableClass">
          <tr class="phoneNumberClass">
            <td class="iconColumn">
              <font-awesome-icon icon="phone" />
            </td>
            <td class="dataColumn">{{ indexCardData.phone }}</td>
          </tr>
          <tr>
            <td class="iconColumn">
              <div class="pinContainer">
                <span>
                  <font-awesome-icon icon="map-pin" />
                </span>
              </div>
            </td>
            <td class="dataColumn">
              <div class="adressTextClass">
                {{ indexCardData.adress.street }}
                {{ indexCardData.adress.houseNumber }}
                <br />
                {{ indexCardData.adress.postCode }}
                {{ indexCardData.adress.city }}
              </div>
            </td>
          </tr>
        </table>

        <div class="dateTable">
          <table>
            <tr>
              <td class="iconColumn">
                <font-awesome-icon icon="clock" />
              </td>
              <td class="dataColumn">
                {{ getDateString(indexCardData.date) }}
              </td>
            </tr>
          </table>
        </div>
      </b-card-text>
    </b-card>
    <indexCardDetail :index-card-data="indexCardData"></indexCardDetail>
  </div>
</template>

<script>
import IndexCardDetail from "@/components/IndexCard/IndexCardDetail.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faMapPin, faClock } from "@fortawesome/free-solid-svg-icons";

library.add([faPhone, faMapPin, faClock]);

export default {
  name: "IndexCard",
  components: {
    IndexCardDetail
  },
  props: {
    indexCardData: Object
  },
  computed: {},
  methods: {
    getDateString: function(date) {
      date = new Date(date);
      let weekDay = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      let month = [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez"
      ];

      return (
        weekDay[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        month[date.getMonth()] +
        " " +
        date.getFullYear()
      );
    },
    openModal: function() {
      // $ bedeutet globale Variable
      this.$bvModal.show(this.indexCardData.id);
    }
  }
};
</script>

<style scoped lang="scss">
.indexCard {
  float: left;
  padding: 10px;
}

.indexCard h5 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1000px) {
  .indexCard {
    width: 25%;
    max-width: 25%;
    min-width: 25%;
  }
}
@media (min-width: 1200px) {
  .indexCard {
    width: 20%;
    min-width: 20%;
    max-width: 20%;
  }
}

.card-body {
  height: 200px;
}
.card {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px 1px rgba(179, 179, 179, 0.12);
}

.mapContainer {
  display: flex;
}

.pinContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.iconColumn {
  width: 26px;
  color: grey;
  font-size: 17px;
}

.dataColumn {
  font-size: 15px;
}

.dateTable {
  position: absolute;
  bottom: 15px;
}
</style>
