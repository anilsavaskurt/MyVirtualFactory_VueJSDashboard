<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subtitle" :infoTitle="table.infotitle">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Ürün Adedi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in this.table.data" :key="order.id">
              <td>{{ order.name }}</td>
              <td>{{ order.amount }}</td>
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
const getProductsUrl = "http://localhost:57712/api/Order/GetOrdersItemsByOrderId?orderId=";
export default {
  components: {
    Button
  },
  methods: {
  },
  data() {
    return {
      table: {
        title: "Sipariş Detayım",
        subtitle: "",
        infotitle: "",
        data: []
      },
      chart: [],
      orderDate: "",
      orderId: null,
      orderStatus: null,
    };
  },
  created() {
    this.orderId = this.$route.params.id;
    this.orderStatus = this.$route.params.status;
    this.table.subtitle="Sipariş Numarası: "+this.orderId;
    this.table.infotitle="Sipariş Durumu: "+this.orderStatus;
    axios.get(getProductsUrl+ this.orderId).then(response => {
      this.table.data = response.data.data;
  })},
};
</script>
<style scoped></style>
