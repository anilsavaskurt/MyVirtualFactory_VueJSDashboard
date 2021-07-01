<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div class="form-group">
          <div class="form-group">
            <label>Ürünler</label>
            <select class="form-control" v-model="selecteds.selectedProduct">
              <option
                v-for="product in products"
                v-bind:value="product"
                v-bind:key="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>

          <label>Makineler</label>
          <select class="form-control" v-model="selecteds.selectedWorkCenter">
            <option
              v-for="wc in workCenters"
              v-bind:value="wc"
              v-bind:key="wc.id"
            >
              {{ wc.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Bitiş Zamanı</label>
          <input
            class="form-control d-flex align-self-end float-right bg-light"
            type="datetime-local"
            style="width:40%"
            v-model="selecteds.calenderVal"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-lg" v-on:click="createSchedule()">
            Ürünü Üret
          </button>
        </div>

      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/Button.vue";
import NotificationTemplate from './Notifications/NotificationTemplate';

const GetWorkCentersForProductsURL =
  "http://localhost:57712/api/Order/GetCreatorWorkCenters";
const createScheduleURL = "http://localhost:57712/api/Schedule";
export default {
  components: {
    Button
  },
  methods: {
    goPlanPage(name, amount) {
      this.$router.push({
        name: "plan",
        params: { productName: name, productAmount: amount }
      });
    },
    groupBy(array, key) {
      const result = [];
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        if (key == "workCenterName")
          result[item[key]].push({
            name: item.workCenterName,
            id: item.workCenterId
          });
        else
          result[item[key]].push({
            name: item.productName,
            id: item.productId
          });
      });
      return result;
    },
    createSchedule() {
      this.request.productId = this.selecteds.selectedProduct.id;
      this.request.productName = this.selecteds.selectedProduct.name;
      this.request.workCenterId = this.selecteds.selectedWorkCenter.id;
      this.request.workCenterName = this.selecteds.selectedWorkCenter.name;
      this.request.endDate = this.selecteds.calenderVal;
      console.log(this.request);
      axios
        .post(createScheduleURL,this.request)
        .then(response => {
          if (response.status == 200) {
          this.notifyVue('bottom', 'right',"success")
        } else {
          this.notifyVue('bottom', 'right',"danger")
        }
        });
    },
    notifyVue(verticalAlign, horizontalAlign, color) {
      this.$notify({
        component: NotificationTemplate,
        icon: "ti-bell",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: color
      });
    }
  },
  data() {
    return {
      table: {
        title: "Sipariş Detayı",
        subtitle: "",
        data: []
      },
      chart: [],
      request: {
        productId: null,
        workCenterId: null,
        productName: null,
        workCenterName: null,
        endDate: null
      },
      selecteds: {
        selectedWorkCenter: null,
        selectedProduct: null,
        calenderVal: null
      },
      groupedWorkCenters: null,
      groupedProducts: null,
      workCenters: [],
      products: [],
      keys: []
    };
  },
  created() {
    axios
      .post(GetWorkCentersForProductsURL, {
        orderId: parseInt(this.$route.params.orderId)
      })
      .then(response => {
        this.groupedWorkCenters = this.groupBy(
          response.data.data,
          "workCenterName"
        );
        this.groupedProducts = this.groupBy(response.data.data, "productId");
        for (var propName in this.groupedWorkCenters) {
          if (this.groupedWorkCenters.hasOwnProperty(propName)) {
            var propValue = this.groupedWorkCenters[propName];
            if (!this.workCenters.includes(propValue[0])) {
              this.workCenters.push(propValue[0]);
            }
          }
        }
        for (var propName in this.groupedProducts) {
          if (this.groupedProducts.hasOwnProperty(propName)) {
            var propValue = this.groupedProducts[propName];
            if (!this.products.includes(propValue[0])) {
              console.log(propValue[0]);
              this.products.push(propValue[0]);
            }
          }
        }
      });
  }
};
</script>
<style></style>
