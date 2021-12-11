<template>
    <div sm="5" class="d-flex justify-content-center align-items-center login">
      <div class="col-4">
        <h2 class="text-center mb-5 title-login">Faça o seu cadastro</h2>
        <b-form>
          <b-form-group
            label="E-mail"
            label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                autocomplete="off"
                placeholder="Digite seu email"
                v-model="newUser.email"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
              label="Senha"
              label-for="password"
            >
 
              <b-form-input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                v-model="newUser.password"
              ></b-form-input>
            </b-form-group>

          <b-form-group
              label="Confirmar senha"
              label-for="confirmPassword"
            >
 
              <b-form-input
                id="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                v-model="confirmPassword"
              ></b-form-input>
            </b-form-group>

            <b-button v-on:click="register"
              type="button"
              variant="primary"
              block
            >
              <i class="fas fa-sign-in-alt"></i> Cadastrar-se
            </b-button>

 
            <hr>
            <b-button type="button" block variant="outline-secondary" v-on:click="returnToLogin">Voltar para a tela de login</b-button>
 
        </b-form>
      </div>
    </div>
</template>
 
 <script>

 import api from "../services/api"

 export default {
     data() {
         return { newUser: { email: "", password: ""}, confirmPassword: "" }
     },
     methods: {
         register(){
           if (this.newUser.password === this.confirmPassword) {
             api.post("/signup", this.newUser).then((response) => {
               console.log(response);
                alert("Usuário cadastrado com sucesso!")  
                this.returnToLogin()
             }).catch((error) => {
               alert("Usuário já existe!")
                console.log(error);
             })
           } else {
             alert("Senha não confere!")
           }
         },
         returnToLogin() {
             this.$router.go(-1)
         }
     }
 }
 </script>