<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Makine Kodu</th>
              <th>Makine Adı</th>
              <th>Üretim Başlangıç Tarihi</th>
              <th>Üretim Bitiş Tarihi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="schedule in this.table.data"
              :key="schedule.id"
              v-bind:class="{
                warning: dateNow < getDateTime(schedule.endDate),
                success: dateNow > getDateTime(schedule.endDate)
              }"
            >
              <td>{{ schedule.productId }}</td>
              <td>{{ schedule.productName }}</td>
              <td>{{ schedule.workCenterId }}</td>
              <td>{{ schedule.workCenterName }}</td>
              <td>{{ getDateTime(schedule.startDate) }}</td>
              <td>{{ getDateTime(schedule.endDate) }}</td>
            </tr>
          </tbody>
          <div slot="legend" class="pt-3">
            <i class="fa fa-circle text-success"></i> Tamamlandı
            <i class="fa fa-circle text-warning"></i> Üretiliyor
          </div>
        </table>
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/Button.vue";
import moment from "moment";
const getSchedulesURL = "http://localhost:57712/api/Schedule";

export default {
  components: {
    Button
  },
  data() {
    return {
      table: {
        title: "Planlama",
        subTitle: "",
        data: []
      },
      dateNow: null
    };
  },
  created() {
    let date = moment().add(10, 'minutes').format("YYYY-MM-DD HH:mm:ss");
    console.log("Date: " + date);
    axios.get(getSchedulesURL).then(response => {
      this.table.data = response.data.data;
      console.log(response.data);
    });
  },
  methods: {
    getActivity(param) {
      if (param) {
        return "Boşta";
      }
      return "Meşgul";
    },
    addWorkCenter() {
      console.log(Object.values(this.newWorkCenters));
      axios.post(getWorkCentersURL, this.newWorkCenters).then(res => {
        if (res.status == 200) {
          this.table.data.push(this.newWorkCenters);
        } else {
        }
        this.newWorkCenters.workCenterName = null;
        this.newWorkCenters.isActive = null;
        this.closeChart();
        return this.table.data;
      });
    },
    showChart() {
      this.$modal.show("example");
    },
    closeChart() {
      this.$modal.hide("example");
    },
    getDateTime(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY HH:mm");
      }
    }
  }
};
</script>
<style>
.danger {
  background-color: #d9534f !important;
}
.success {
  background-color: #5cb85c !important;
}
.warning {
  background-color: #f0ad4e !important;
}
</style>
