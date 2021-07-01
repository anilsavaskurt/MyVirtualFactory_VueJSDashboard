<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subtitle">
        <div style="position: absolute; right:0; top: 0;">
          <button
            class="btn btn-success btn-group-lg mt-2 mr-2"
            v-on:click="showSubProductTreeChart()"
          >
            Ürün Ağacı Oluştur
          </button>

          <button
            class="btn btn-success btn-group-lg mr-2 mt-2"
            v-on:click="showChart()"
          >
            YENİ ÜRÜN EKLE
          </button>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Ürün Sayısı</th>
              <th>Ürün Tipi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in this.table.data" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.count }}</td>
              <td>{{ product.type }}</td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
    <modal name="example" :width="900" :height="600" :adaptive="true">
      <div class="bg-light w-100 h-100">
        <div class="d-flex  justify-content-center">
          <h3>Ürün Ekle</h3>
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
          <div class="form-group">
            <label>Ürün Adı</label>
            <input
              type="text"
              v-model="newProduct.name"
              class="form-control form-control-lg"
              placeholder="Ürün Adı"
            />
          </div>
          <div class="form-group">
            <label>Ürün Tipi</label>
            <select v-model="newProduct.productType" class="form-control">
              <option
                v-for="pt in productType"
                v-bind:value="pt.index"
                v-bind:key="pt.index"
              >
                {{ pt.value }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Satış Türü</label>
            <select class="form-control" v-model="newProduct.isSalable">
              <option v-bind:value="true">Ana Ürün</option>
              <option v-bind:value="false">Ham Madde</option>
            </select>
          </div>

          <div class="form-group">
            <label>Ürün Sayısı</label>
            <input
              type="number"
              class="form-control form-control-lg"
              placeholder="0"
              min="0"
              v-model.number="newProduct.amountOfProduct"
            />
          </div>
        </div>
      </div>
      <button
        class="btn btn-success btn-group-lg mr-4 mb-4"
        style="position: absolute; right:0; bottom: 0;"
        v-on:click="addProduct()"
      >
        Ekle
      </button>
    </modal>
    <modal name="subProductTree" :width="900" :height="600" :adaptive="true">
      <div class="bg-light w-100 h-100">
        <div class="d-flex  justify-content-center">
          <h3>Ürün Ağacı Ekle</h3>
          <button
            class="btn btn-danger"
            style="position: absolute; right:0; top: 0;"
            v-on:click="closeSubProductTreeChart()"
          >
            <span class="ti-close"> </span>
          </button>
        </div>
        <div
          class="justify-content-center align-items-center w-75"
          style="margin-left:auto;margin-right:auto;"
        >
          <div class="form-group">
            <label>Ana Ürün</label>
            <select
              v-model="subProductTreeReq.productId"
              class="form-control scrollable"
            >
              <option
                v-for="mp in mainProducts"
                v-bind:value="mp.id"
                v-bind:key="mp.id"
              >
                {{ mp.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Ham Madde</label>
            <select
              v-model="subProductTreeReq.subProductId"
              class="form-control"
            >
              <option
                v-for="sp in subProducts"
                v-bind:value="sp.id"
                v-bind:key="sp.id"
              >
                {{ sp.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Ürünün Üretilmesi İçin Gerekli Ham Madde Sayısı</label>
            <input
              type="number"
              class="form-control form-control-lg"
              placeholder="0"
              min="0"
              v-model.number="subProductTreeReq.produceAmount"
            />
          </div>
        </div>
      </div>
      <button
        class="btn btn-success btn-group-lg mr-4 mb-4"
        style="position: absolute; right:0; bottom: 0;"
        v-on:click="createSubProductTree()"
      >
        Ekle
      </button>
    </modal>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/Button.vue";
const getProductsUrl = "http://localhost:57712/api/Product";
const addProductsUrl = "http://localhost:57712/api/Product";
const createSubProductTree = "http://localhost:57712/api/SubProductTree";
const headers = { "Access-Control-Allow-Origin": "*" };
export default {
  components: {
    Button
  },
  methods: {
    addProduct() {
      console.log(Object.values(this.newProduct));
      axios.post(addProductsUrl, this.newProduct).then(res => {
        console.log(res.status);
        if (res.status == 200) {
          console.log("GİRDİİİİİİİİİİİ");
          this.table.data.push(this.newProduct);
        } else {
        }

        this.newProduct.name = null;
        this.newProduct.productType = null;
        this.newProduct.isSalable = null;
        this.newProduct.amountOfProduct = null;
        this.closeChart();
        return this.table.data;
      });
    },
    createSubProductTree() {
      axios.post(createSubProductTree, this.subProductTreeReq).then(res => {
        console.log(res.status);
        if (res.status == 200) {
          console.log("BAŞARILI");
        } else {
        }
        this.subProductTreeReq.produceAmount = null;
        this.subProductTreeReq.subProductId = null;
        this.subProductTreeReq.productId = null;
        this.closeChart();
      });
    },
    showChart() {
      this.$modal.show("example");
    },
    closeChart() {
      this.$modal.hide("example");
      console.log("ORDER DATE :" + this.orderDate);
    },
    showSubProductTreeChart() {
      this.$modal.show("subProductTree");
    },
    closeSubProductTreeChart() {
      this.$modal.hide("subProductTree");
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
      orderDate: "",
      productType: [
        { index: 0, value: "Car" },
        { index: 1, value: "Truck" },
        { index: 2, value: "Tractor" },
        { index: 3, value: "Plastic" },
        { index: 4, value: "Metal" }
      ],
      newProduct: {
        name: null,
        productType: null,
        isSalable: null,
        amountOfProduct: null
      },
      selected: "",
      subProductTreeReq: {
        produceAmount: null,
        subProductId: null,
        productId: null
      },
      subProducts: null,
      mainProducts: null
    };
  },
  created() {
    axios.get(getProductsUrl, headers).then(response => {
      this.table.data = response.data.data.map(product => ({
        id: product.id,
        name: product.name,
        type: product.isSalable ? "Ana Ürün" : "Ham Madde",
        count: product.amountOfProduct
      }));
      this.subProducts = this.table.data.filter(e => {
        return e.type == "Ham Madde";
      });
      this.mainProducts = this.table.data.filter(e => {
        return e.type == "Ana Ürün";
      });
      console.log(this.mainProducts.length);
    });
  }
};
</script>
<style scoped></style>
