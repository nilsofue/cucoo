<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company" hide-footer>
      <table id="myTable">
        <tr>
          <td>
            <p>
              <br />
              {{ indexCardData.adress.street }}
              {{ indexCardData.adress.houseNumber }}
              <br />
              {{ indexCardData.adress.postCode }}
              {{ indexCardData.adress.city }}
              <br />
              {{ indexCardData.phone }}
            </p>
          </td>
          <td>
            <b-navbar-nav>
              <b-nav-form>
                <date-pick
                  id="dateAppEl"
                  v-model="dateAppointment"
                  :format="'YYYY-MM-DD HH:mm'"
                ></date-pick>
              </b-nav-form>

              <b-nav-form>
                <date-pick
                  v-model="dateVisit"
                  :format="'YYYY-MM-DD HH:mm'"
                ></date-pick>
              </b-nav-form>
            </b-navbar-nav>
          </td>
        </tr>

        <tr>
          <td>
            <b-navbar-nav>
              <b-nav-item-dropdown
                :text="getStatusDataByIndexCardId(indexCardData.id).name"
              >
                <b-dropdown-item v-for="(status, i) in data.status" :key="i">
                  {{ status.name }}
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </td>
        </tr>
      </table>

      <NoticeComponent
        :notice-data-array="indexCardData.notes"
        :index-card-id="indexCardData.id"
        :edit-mode="true"
      ></NoticeComponent>

      <footer>
        <b-button>
          Edit
        </b-button>
      </footer>
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
        return {
          date: 0
        };
      }
    }
  },
  data: () => ({
    dateVisit: "Besuch",
    dateAppointment: ""
  }),

  mounted() {
    this.dateAppointment = new Date(this.indexCardData.date).toString();
  },
  computed: {
    ...mapGetters(["getStatusDataByIndexCardId", "data"])
  }
};

// timestamp: new Date().getTime()
</script>

<style scoped lang="scss">
footer {
  margin-top: 5%;
}
</style>
