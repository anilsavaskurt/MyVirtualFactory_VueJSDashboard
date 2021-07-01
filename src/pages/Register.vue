<template>
  <div
    class="d-flex bg-dark justify-content-center align-items-center"
    style="min-width:100%;height:100vh;"
  >
    <card class="cardStyle p-3">
      <h3 class="text-center text-secondary p-4">Kayıt Ol</h3>
      <p class="text-danger" v-if="this.message != null">{{message}}</p>
      <div class="form-group">
        <label>Ad</label>
        <input
          type="text"
          v-model="request.firstName"
          class="form-control form-control-lg"
          placeholder="Ad"
        />
      </div>
      <div class="form-group">
        <label>Soyad</label>
        <input
          type="text"
           v-model="request.lastName"
          class="form-control form-control-lg"
          placeholder="Soyad"
        />
      </div>
      <div class="form-group">
        <label>Email <span class="ti-email"></span></label>
        <input
          type="email"
          v-model="request.email"
          class="form-control form-control-lg"
          placeholder="Email"
        />
      </div>
      <div class="form-group">
        <label>Kullanıcı Adı</label>
        <input
          type="text"
          v-model="request.userName"
          class="form-control form-control-lg"
          placeholder="Kullanıcı Adı"
        />
      </div>

      <div class="form-group">
        <label>Şifre <span class="ti-lock"></span></label>
        <input
          type="password"
          v-model="request.password"
          class="form-control form-control-lg"
          placeholder="Şifre"
        />
      </div>

      <div class="form-group">
        <label>Şifre Onay<span class="ti-lock"></span></label>
        <input
          type="password"
          v-model="request.confirmPassword"
          class="form-control form-control-lg"
          placeholder="Şifre Onay"
        />
      </div>

      <button class="btn btn-secondary btn-lg btn-block" @click="register()">
        Kayıt Ol
      </button>
    </card>
  </div>
</template>
<script>
import Button from "../components/Button.vue";
import Card from "../components/Cards/Card.vue";
import axios from "axios";
const RegisterURL = "http://localhost:57712/api/Account/register";
export default {
  components: {
    Button,
    Card
  },
  data() {
    return {
      request: {
        firstName: null,
        lastName: null,
        email: null,
        userName: null,
        password: null,
        confirmPassword: null,
        isCustomer: true
      },
      message : null
    };
  },
  methods: {
    register() {
      axios
        .post(RegisterURL, this.request)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.$router.push("/login");
          } else{
            this.message = "Hatalı İşlem";
          }
      });
    }
  }
};
</script>
<style scoped>
.cardStyle {
  height: 700px;
  width: 500px;
}
</style>
