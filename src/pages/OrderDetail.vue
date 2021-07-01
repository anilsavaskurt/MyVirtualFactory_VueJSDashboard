<template>
  <div class="row">
    <div class="col-12">
      <card
        :title="table.title"
        :subTitle="table.subtitle"
        :infoTitle="table.infotitle"
      >
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ürün Adı</th>
              <th>Ürün Adedi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in this.table.data" :key="order.id">
              <td>{{ order.id }}</td>
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
const getProductsUrl =
  "http://localhost:57712/api/Order/GetOrdersItemsByOrderId?orderId=";
export default {
  components: {
    Button
  },
  methods: {
    goPlanPage(id, name, amount) {
      this.$router.push({
        name: "plan",
        params: { productId: id, productName: name, productAmount: amount }
      });
    }
  },
  data() {
    return {
      table: {
        title: "Sipariş Detayı",
        subtitle: "",
        infotitle: "",
        data: []
      },
      chart: [],
      orderDate: "",
      orderId: null,
      orderStatus: null
    };
  },
  created() {
    this.orderId = this.$route.params.id;
    this.orderStatus = this.$route.params.status;
    this.table.subtitle = "Sipariş Numarası: " + this.orderId;
    this.table.infotitle = "Sipariş Durumu: " + this.orderStatus;
    console.log(this.orderId + "     " + this.orderStatus);
    console.log(getProductsUrl + this.orderId);
    axios.get(getProductsUrl + this.orderId).then(response => {
      this.table.data = response.data.data;
      console.log(response.data.data);
    });
  }
};
</script>
<style scoped></style>
