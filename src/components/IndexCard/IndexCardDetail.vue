<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company">
      <p>
        <br />
        {{ indexCardData.adress.street }} {{ indexCardData.adress.houseNumber }}
        <br />
        {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
      </p>
      <b-navbar-nav>
        <b-nav-item-dropdown
          :text="getStatusDataByIndexCardId(indexCardData.id).name"
        >
          <b-dropdown-item v-for="(status, i) in data.status" :key="i">
            {{ status.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-form>
          <date-pick
            v-model="dateAppointment"
            :pick-time="true"
            :format="'YYYY-MM-DD HH:mm'"
          ></date-pick>
        </b-nav-form>

        <b-nav-form>
          <date-pick
            id="DetailDateBesuch"
            v-model="dateVisit"
            :format="'YYYY-MM-DD HH:mm'"
          ></date-pick>
        </b-nav-form>
      </b-navbar-nav>

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
import { mapGetters } from "vuex";
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
        return {};
      }
    }
  },
  data: () => ({
    date: "2019-01-01 00:00",
    dateVisit: "Besuch",
    dateAppointment: "Termin"
  }),
  computed: {
    ...mapGetters(["getStatusDataByIndexCardId", "data"])
  }
};

// timestamp: new Date().getTime()
</script>

<style scoped lang="scss"></style>
