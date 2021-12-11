<template>
    <div sm="5" class="d-flex justify-content-center align-items-center login">
      <div class="col-4">
        <h2 class="text-center mb-5 title-login">Faça o login</h2>
        <b-form>
          <b-form-group
            label="E-mail"
            label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                autocomplete="off"
                v-model="user.email"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
              label="Senha"
              label-for="password"
            >
 
              <b-form-input
                id="password"
                type="password"
                v-model="user.password"
              ></b-form-input>
            </b-form-group>
 
            <b-button v-on:click="login"
              type="button"
              variant="primary"
              block
            >
              <i class="fas fa-sign-in-alt"></i> Entrar
            </b-button>
 
            <hr>
 
            <b-button
              type="button"
              variant="outline-secondary"
              block
              @click="register">
              <i class="fas fa-user-plus"></i> Não tenho conta
            </b-button>
        </b-form>
      </div>
    </div>
</template>
 
<script>
import api from "../services/api"
// import router from "../main"

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
        // Enviar dados para requisição
        api.post("/login", this.user).then(() => {
            this.$router.push("/dashboard")
        }).catch(() => {
          alert("Usuário não encontrado")
        })
    },
    register() {
      this.$router.push("/signup")
    },
 
  }
}
</script>
 
<style>
 
*, /*resetar o estilo da página*/
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
 
.row-login {
  margin-left: 0;
}
 
.left-login {
  background-color: #F2F2F2;
}
 
.title-login {
  font-weight: bold;
}