<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subtitle">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Sipariş Numarası</th>
              <th>Sipariş Tarihi</th>
              <th>Siparişin Hazırlanma Tarihi</th>
              <th>Siparişin Durumu</th>
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
              <a  class="btn btn-info" @click="goDetail(order.id,order.orderStatus)">
                SİPARİŞ DETAYINI GÖR<span class="ti-search pl-2"></span>
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
const getProductsUrl = "http://localhost:57712/api/Order/GetCustomersOrdersQuery?customerId=";
export default {
  components: {
    Button
  },
  methods: {
    goDetail(orderId, orderStatus){
      this.$router.push({ name: 'myorderdetail', params: { id: orderId, status: this.getStatus(orderStatus) } })
    },
    getStatus(param){
      console.log(param)
      return this.status[param];
    }
  },
  data() {
    return {
      table: {
        title: "Siparişlerim",
        data: []
      },
      chart: [],
      orderDate: "",
      customerId: null,
      status: ["Üretim Aşamasında","Planlandı","Üretilemiyor","Üretildi","Oluşturuldu"]
    };
  },
  created() {
    this.customerId = sessionStorage.getItem("id");
    axios.get(getProductsUrl+this.customerId).then(response => {
      this.table.data = response.data.data;
      console.log(response.data.data)
  }).catch(e => console.log(e));
  },
};
</script>
<style scoped></style>
