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
                placeholder="joaosilva@email.com"
                autocomplete="off"
                v-model="form.email"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
              label-for="password"
            >
              <label class="d-flex justify-content-between">
                Senha
                <small><a href="#">Esqueceu sua senha?</a></small>
              </label>
 
              <b-form-input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                v-model="form.password"
              ></b-form-input>
            </b-form-group>
 
            <b-button
              type="button"
              variant="primary"
              block
              @click="login">
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

const url = "http://localhost:8000/login"
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
        // Enviar dados para requisição
        alert('oi')
        this.$http.post(url, this.form)
    },
 
    register() {},
 
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