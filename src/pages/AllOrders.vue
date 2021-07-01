<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subtitle">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Sipariş Numarası</th>
              <th>Sipariş Tarihi</th>
              <th>Sipariş Son Teslim Tarihi</th>
              <th>Sipariş Durumu</th>
              <th>Siparişi Planla</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in this.table.data" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.orderDate }}</td>
              <td>{{ order.orderDeadLineDate }}</td>
              <td>{{ getStatus(order.orderStatus) }}</td>
              <td>
                <a
                  class="btn btn-warning"
                  @click="goPlanPage(order.id)"
                >
                  PLANLA<span class="ti-search pl-2"></span>
                </a>
              </td>
              <td>
                <a
                  class="btn btn-info"
                  @click="goDetail(order.id, order.orderStatus)"
                >
                  DETAY<span class="ti-search pl-2"></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/Button.vue";
const getProductsUrl = "http://localhost:57712/api/Order/GetAllOrders";
export default {
  components: {
    Button
  },
  methods: {
    goDetail(orderId, orderStatus) {
      this.$router.push({
        name: "orderdetail",
        params: { id: orderId, status: this.getStatus(orderStatus) }
      });
    },
    getStatus(param) {
      console.log(param);
      return this.status[param];
    },
    goPlanPage(id) {
      this.$router.push({
        name: "plan",
        params: { orderId: id}
      });
    }
  },
  data() {
    return {
      table: {
        title: "Tüm Siparişler",
        data: []
      },
      chart: [],
      orderDate: "",
      customerId: null,
      status: [
        "Üretim Aşamasında",
        "Planlandı",
        "Üretilemiyor",
        "Üretildi",
        "Oluşturuldu"
      ]
    };
  },
  created() {
    axios.get(getProductsUrl).then(response => {
      this.table.data = response.data.data;
      console.log(response.data.data);
    });
  }
};
</script>
<style scoped></style>
