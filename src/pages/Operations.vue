<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title">
        <div style="position:absolute; right:0; top: 0;">
          <button
            class="btn btn-success btn-group-lg mt-2 mr-3"
            v-on:click="showWorkCenterOperationChart()"
          >
            OPERASYON MAKİNE EŞLEŞTİR
          </button>
          <button
            class="btn btn-success btn-group-lg mr-2 mt-2"
            v-on:click="showChart()"
          >
            YENİ OPERASYON EKLE
          </button>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Operasyon Kodu</th>
              <th>İsim</th>
              <th>Ürün Tipi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="operations in this.table.data" :key="operations.id">
              <td>{{ operations.id }}</td>
              <td>{{ operations.operationName }}</td>
              <td>
                {{ getOperationProductType(operations.operationProductType) }}
              </td>
            </tr>
          </tbody>
        </table>
      </card>
      <modal name="example" :width="800" :height="350" :adaptive="true">
        <div class="bg-light w-100 h-100">
          <div class="d-flex  justify-content-center">
            <h3>Operasyon Ekle</h3>
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
              <label>Operasyon Adı</label>
              <input
                type="text"
                v-model="newOperationType.operationName"
                class="form-control form-control-lg"
                placeholder="Operasyon Adı"
              />
            </div>

            <div class="form-group">
              <label>Operasyon Ürün Tipi</label>
              <select
                v-model="newOperationType.operationProductType"
                class="form-control"
              >
                <option
                  v-for="pt in productType"
                  v-bind:value="pt.index"
                  v-bind:key="pt.index"
                >
                  {{ pt.value }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button
          class="btn btn-success btn-group-lg mr-4 mb-4"
          style="position: absolute; right:0; bottom: 0;"
          v-on:click="createOperation()"
        >
          Ekle
        </button>
      </modal>
      <modal name="workcenteropr" :width="700" :height="400" :adaptive="true">
        <div class="bg-light w-100 h-100">
          <div class="d-flex  justify-content-center">
            <h3>Operasyon Makine Ekle</h3>
            <button
              class="btn btn-danger"
              style="position: absolute; right:0; top: 0;"
              v-on:click="closeWorkCenterOperationChart()"
            >
              <span class="ti-close"> </span>
            </button>
          </div>
          <div
            class="justify-content-center align-items-center w-75"
            style="margin-left:auto;margin-right:auto;"
          >
            <div class="form-group">
              <label>Operasyonlar</label>
              <select
                v-model="workCenterOperationReq.operationId"
                class="form-control"
              >
                <option
                  v-for="opr in table.data"
                  v-bind:value="opr.id"
                  v-bind:key="opr.id"
                >
                  {{ opr.operationName }}
                </option>
              </select>
              <p>{{workCenterOperationReq.operationId}}</p>

            </div>

            <div class="form-group">
              <label>Makineler</label>
              <select
                v-model="workCenterOperationReq.workCenterId"
                class="form-control"
              >
                <option
                  v-for="wc in workCenters"
                  v-bind:value="wc.id"
                  v-bind:key="wc.id"
                >
                  {{ wc.workCenterName }}
                </option>
              </select>
              <p>{{workCenterOperationReq.workCenterId}}</p>
            </div>

            <div class="form-group">
              <label>Üretim Hızı</label>
              <input
                type="number"
                class="form-control form-control-lg"
                placeholder="0"
                min="0"
                v-model.number="workCenterOperationReq.speed"
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-success btn-group-lg mr-4 mb-4"
          style="position: absolute; right:0; bottom: 0;"
          v-on:click="createWorkCenterOperation()"
        >
          Ekle
        </button>
      </modal>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/Button.vue";
const getOperationsURL = "http://localhost:57712/api/Operation";
const createOperationsURL = "http://localhost:57712/api/Operation";
const getWorkCentersURL = "http://localhost:57712/api/WorkCenter";
const createWorkCenterOperationURL = "http://localhost:57712/api/WorkCenterOperation";

export default {
  components: {
    Button
  },
  data() {
    return {
      table: {
        title: "Operasyonlar",
        subTitle: "",
        data: []
      },
      productType: [
        { index: 0, value: "Car" },
        { index: 1, value: "Truck" },
        { index: 2, value: "Tractor" },
        { index: 3, value: "Plastic" },
        { index: 4, value: "Metal" }
      ],
      newOperationType: {
        id: 0,
        operationName: null,
        operationProductType: null
      },
      workCenters: null,
      workCenterOperationReq: {
        workCenterId: null,
        operationId: null,
        speed: null
      }
    };
  },
  created() {
    axios.get(getOperationsURL).then(response => {
      console.log(response.data);
      this.table.data = response.data.data;
    });
  },
  methods: {
    getOperationProductType(param) {
      let types = this.productType.filter(e => {
        return e.index == param;
      });
      return types[0].value;
    },
    createOperation() {
      axios.post(createWorkCenterOperationURL, this.newOperationType).then(res => {
        console.log(res.status);
        if (res.status == 200) {
          this.newOperationType.id =
            this.table.data[this.table.data.length] + 1;
          console.log("Last Element");
          console.log(this.newOperationType);
          this.table.data.push(this.newOperationType);
        } else {
        }
        this.newOperationType.operationName = null;
        this.newOperationType.operationProductType = null;
        this.closeChart();
        return this.table.data;
      });
    },
    createWorkCenterOperation() {
      axios.post(createOperationsURL, this.workCenterOperationReq).then(res => {
        console.log(res.status);
        if (res.status == 200) {
        } else {
        }
        this.workCenterOperationReq.workCenterId = null;
        this.workCenterOperationReq.operationId = null;
        this.workCenterOperationReq.speed = null;
        this.closeChart();
      });
    },
    showChart() {
      this.$modal.show("example");
    },
    closeChart() {
      this.$modal.hide("example");
    },
    showWorkCenterOperationChart() {
      axios.get(getWorkCentersURL).then(res => {
        console.log(res.status);
        this.workCenters = res.data.data;
      });
      this.$modal.show("workcenteropr");
    },
    closeWorkCenterOperationChart() {
      this.$modal.hide("workcenteropr");
    }
  }
};
</script>
<style></style>
