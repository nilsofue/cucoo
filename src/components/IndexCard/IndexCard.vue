<template>
  <div class="indexCard" @click="openModal">
    <b-card>
      <b-card-text>
        <h5>{{ indexCardData.company }}</h5>
        <p class="phoneNumberClass">
          <font-awesome-icon icon="phone" />
          {{ indexCardData.phone }}
        </p>
        <div class="mapContainer">
          <div class="pinContainer">
            <span>
              <font-awesome-icon icon="map-pin" />
            </span>
          </div>
          <div class="adressTextClass">
            {{ indexCardData.adress.street }}
            {{ indexCardData.adress.houseNumber }}
            <br />
            {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
          </div>
        </div>
      </b-card-text>
    </b-card>
    <indexCardDetail :index-card-data="indexCardData"></indexCardDetail>
  </div>
</template>

<script>
import IndexCardDetail from "@/components/IndexCard/IndexCardDetail.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faMapPin } from "@fortawesome/free-solid-svg-icons";

library.add([faPhone, faMapPin]);

export default {
  name: "IndexCard",
  components: {
    IndexCardDetail
  },
  props: {
    indexCardData: Object
  },
  methods: {
    openModal: function() {
      // $ bedeutet globale Variable
      this.$bvModal.show(this.indexCardData.id);
    }
  }
};
</script>

<style scoped lang="scss">
.indexCard {
  width: 20%;
  min-width: 20%;
  float: left;
  padding: 10px;
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
  align-items: center;
  justify-content: center;
  margin-right: 18px;
}

.pinContainer span {
}

.phoneNumberClass {
  color: grey;
  font-size: 14px;
}

.adressTextClass {
  font-size: 14px;
}
</style>
