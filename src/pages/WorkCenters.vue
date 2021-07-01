<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title">
        <button
          class="btn btn-success btn-group-lg mr-2 mt-2"
          style="position: absolute; right:0; top: 0;"
          v-on:click="showChart()"
        >
          YENİ MAKİNE EKLE
        </button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>İsim</th>
              <th>Aktiflik</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="machine in this.table.data" :key="machine.id">
              <td>{{ machine.id }}</td>
              <td>{{ machine.workCenterName }}</td>
              <td>{{ getActivity(machine.isActive) }}</td>
            </tr>
          </tbody>
        </table>
      </card>
      <modal name="example" :width="700" :height="400" :adaptive="true">
        <div class="bg-light w-100 h-100">
          <div class="d-flex  justify-content-center">
            <h3>Makine Ekle</h3>
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
              <label>Makine Adı</label>
              <input
                type="text"
                v-model="newWorkCenters.workCenterName"
                class="form-control form-control-lg"
                placeholder="Ürün Adı"
              />
            </div>

            <div class="form-group">
              <label>Satış Türü</label>
              <select class="form-control" v-model="newWorkCenters.isActive">
                <option v-bind:value="true">Ana Ürün</option>
                <option v-bind:value="false">Ham Madde</option>
              </select>
            </div>
          </div>
        </div>
        <button
          class="btn btn-success btn-group-lg mr-4 mb-4"
          style="position: absolute; right:0; bottom: 0;"
          v-on:click="addWorkCenter()"
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
const getWorkCentersURL = "http://localhost:57712/api/WorkCenter";

export default {
  components: {
    Button
  },
  data() {
    return {
      table: {
        title: "Makineler",
        subTitle: "",
        data: []
      },
      newWorkCenters: {
        workCenterName: null,
        isActive: null
      }
    };
  },
  created() {
    axios.get(getWorkCentersURL).then(response => {
      console.log(response.data);
      this.table.data = response.data.data;
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
        console.log(res.status);
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
    }
  }
};
</script>
<style></style>
