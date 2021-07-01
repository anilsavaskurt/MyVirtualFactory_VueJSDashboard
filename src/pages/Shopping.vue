<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subtitle">
        <button
          class="btn btn-info btn-group-lg mr-2 mt-2"
          style="position: absolute; right:0; top: 0;"
          v-on:click="showChart()"
          v-if="this.chart.length > 0"
        >
          Sepeti Göster
        </button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Ürün Sayısı</th>
              <th>Sepete Ekle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in this.table.data" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>
                <input
                  class="form-control numInput"
                  type="number"
                  min="0"
                  placeholder="0"
                  v-model="product.count"
                />
              </td>
              <td>
                <button
                  class="btn btn-success"
                  v-on:click="addToChart(product)"
                >
                  <span class="ti-plus"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
    <modal name="example" :width="900" :height="600" :adaptive="true">
      <div class="bg-light w-100 h-100">
        <div class="d-flex  justify-content-center">
          <h3>SEPETİN</h3>
          <button
            class="btn btn-danger"
            style="position: absolute; right:0; top: 0;"
            v-on:click="closeChart()"
          >
            <span class="ti-close"> </span>
          </button>
        </div>
        <div
          class="justify-content-center align-items-center w-75"
          style="margin-left:auto;margin-right:auto;"
        >
          <input
            class="form-control d-flex align-self-end float-right bg-light"
            type="datetime-local"
            style="width:40%"
            v-model="calenderVal"
          />

          <table class="table table">
            <tbody>
              <tr v-for="product in this.chart" :key="product.id">
                <td>{{ product.name }}</td>
                <td>
                  <input
                    class="form-control numInput"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model.number="product.count"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-success btn-group-lg mr-2"
                    v-on:click="deleteFromChart(product)"
                  >
                    Ürünü SİL
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        class="btn btn-success btn-group-lg mr-4 mb-4"
        style="position: absolute; right:0; bottom: 0;"
        v-on:click="createOrder()"
      >
        Siparişi Onayla
      </button>
    </modal>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/Button.vue";
const getProductsUrl = "http://localhost:57712/api/Product?isSalable=true";
const createOrderUrl = "http://localhost:57712/api/Order";
const headers = { "Access-Control-Allow-Origin": "*" };
export default {
  components: {
    Button
  },
  methods: {
    createOrder() {
      let req = {
        products: this.chart.map(product => ({
          productId: product.id,
          amount: parseInt(product.count)
        })),
        customerId: this.customerId,
        orderDeadLineDate: this.calenderVal
      };
      console.log(Object.values(req));
      axios.post(createOrderUrl, req).then(res => console.log(res));
      this.closeChart();
    },
    addToChart(product) {
      const found = this.chart.some(x => x.id === product.id);
      if (!found && product.count != 0) this.chart.push(product);
      console.log(product);
      console.log("Chart Length :" + this.chart.length);
    },
    deleteFromChart(product) {
      const index = this.chart.indexOf(product);
      if (index > -1) {
        this.chart.splice(index, 1);
      }
      if (this.chart.length == 0) this.$modal.hide("example");
    },
    showChart() {
      this.$modal.show("example");
    },
    closeChart() {
      this.$modal.hide("example");
      console.log("ORDER DATE :" + this.orderDate);
    }
  },
  data() {
    return {
      table: {
        title: "Ürünler",
        data: []
      },
      chart: [],
      calenderVal: null,
      customerId: null
    };
  },
  created() {
    axios.get(getProductsUrl, headers).then(response => {
      this.table.data = response.data.data.map(product => ({
        id: product.id,
        name: product.name,
        type: product.productType,
        count: 0
      }));
    });
    this.customerId = sessionStorage.getItem("id");
  },
  mounted() {
    // this.$modal.show("example");
  }
};
</script>
<style scoped></style>
