<template>
  <div
    class="d-flex bg-dark justify-content-center align-items-center"
    style="min-width:100%;height:100vh;"
  >
    <card class="cardStyle p-3">
      <h3 class="text-center text-secondary p-4">Benim Sanal Fabrikam</h3>
  <div id="conditional-rendering">
  <span v-if="seen">Now you see me</span>
</div>

      <div class="form-group">
        <label>Email <span class="ti-email"></span></label>
        <input
          type="email"
          v-model="email"
          class="form-control form-control-lg"
          placeholder="email"
        />
      </div>

      <div class="form-group">
        <label>Password <span class="ti-lock"></span></label>
        <input
          type="password"
          v-model="password"
          class="form-control form-control-lg"
          placeholder="password"
        />
      </div>

      <button class="btn btn-secondary btn-lg btn-block" @click="login()">
        Giriş Yap
      </button>
      <a class="text-secondary" href="register">Kayıt Ol</a>
    </card>
  </div>
</template>
<script>
import Button from "../components/Button.vue";
import Card from "../components/Cards/Card.vue";
import axios from "axios";
const LoginUrl = "http://localhost:57712/api/Account/authenticate";
export default {
  components: {
    Button,
    Card
  },
  data() {
    return {
      email: "",
      password: "",
      role: ""
    };
  },
  created() {},
  // beforeDestroy() {
  //   console.log("destroy");
  //   if (this.email == "user") {
  //     console.log("user giriş yaptı");
  //     sessionStorage.setItem("permission", "user");
  //   } else {
  //     console.log("admin giriş yaptı");
  //     sessionStorage.setItem("permission", "admin");
  //   }
  // },
  methods: {
    login() {
      axios
        .post(LoginUrl, { email: this.email, password: this.password })
        .then(res => {
          console.log(res.data.data);
          if (res.data.data.roles[0] == "Basic"){
             sessionStorage.setItem("id", res.data.data.id);
            this.$router.push("/home");}
          else if (res.data.data.roles[0] == "Admin")
            this.$router.push("/dashboard");
        });
    }
  }
};
</script>
<style scoped>
.cardStyle {
  height: 400px;
  width: 400px;
}
</style>
