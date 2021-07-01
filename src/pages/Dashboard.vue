<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-4"
        v-for="stats in statsCards"
        :key="stats.title"
      >
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-${stats.type}`"
            slot="header"
          >
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row" v-if="preferencesChart.data.series.length > 0">
      <div class="col-md-12" style="margin-right:auto;margin-left:auto;">
        <chart-card
          title="Makine Aktiflik Oranları"
          :chart-data="preferencesChart.data"
          chart-type="Pie"
        >
          <div slot="legend">
            <i class="fa fa-circle text-success"></i> Aktif
            <i class="fa fa-circle text-danger"></i> Boşta
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import axios from "axios";
const getWorkCentersURL = "http://localhost:57712/api/WorkCenter";
const getOrdersURL = "http://localhost:57712/api/Order/GetAllOrders";
const getOperationsURL = "http://localhost:57712/api/Operation";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Toplam Makine",
          value: null,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Toplam Sipariş",
          value: null,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Toplam Operasyon",
          value: null,
           footerText: "Updated now",
          footerIcon: "ti-reload"
        },

      ],
      preferencesChart: {
        data: {
          labels: [],
          series: []
        },
        options: {}
      }
    };
  },
created() {
    axios.get(getWorkCentersURL).then(response => {
      let makineSayisi = response.data.data.length;
      let aktif = response.data.data.filter(e => {
        return e.isActive == true;
      });
      let aktifyuzde = (aktif.length / makineSayisi) * 100;
      var result = Math.round(aktifyuzde * 100) / 100;
      let müsaityuzde = 100 - result;
      this.statsCards[0].value = makineSayisi;
      this.preferencesChart.data.series.push(result);
      this.preferencesChart.data.labels.push("Aktif " + result + "%");
      this.preferencesChart.data.series.push(müsaityuzde);
      this.preferencesChart.data.labels.push("Boşta " + müsaityuzde + "%");
    });
    axios.get(getOrdersURL).then(response => {
      this.statsCards[1].value =response.data.data.length;
    });
   axios.get(getOperationsURL).then(response => {
      this.statsCards[2].value =response.data.data.length;
    });


  }
};
</script>
<style>
.ct-series-b .ct-slice-pie, .ct-series-b .ct-area {
    fill:  #d9534f !important;
}
.ct-series-a .ct-slice-pie, .ct-series-a .ct-area {
  fill: #5cb85c !important;
}
</style>
