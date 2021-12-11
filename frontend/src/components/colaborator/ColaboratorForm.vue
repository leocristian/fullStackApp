<template>
    <div sm="5" class="d-flex justify-content-center align-items-center login">
      <div class="col-4">
        <h2 class="text-center mb-5 title-login">Cadastro de colaborador</h2>
        <b-form>
          <b-form-group
            label="Nome"
            label-for="name"
            >
              <b-form-input
                id="name"
                type="text"
                autocomplete="off"
                v-model="newColaborator.name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
            label="Sobrenome"
            label-for="surname"
            >
              <b-form-input
                id="surname"
                type="text"
                autocomplete="off"
                v-model="newColaborator.surname"
              ></b-form-input>
            </b-form-group>
 
 
            <b-form-group
            label="Email"
            label-for="address"
            >
              <b-form-input
                id="email"
                type="text"
                autocomplete="off"
                v-model="newColaborator.email"
              ></b-form-input>
            </b-form-group>
 
 
            <b-form-group
            label="Departamento"
            label-for="role"
            >
              <b-form-input
                id="role"
                type="text"
                autocomplete="off"
                v-model="newColaborator.role"
              ></b-form-input>
            </b-form-group>

            <b-form-group
            label="Contato"
            label-for="contato"
            >
              <b-form-input
                id="tel"
                type="text"
                autocomplete="off"
                v-model="newColaborator.tel"
              ></b-form-input>
            </b-form-group>
            
            <b-button v-on:click="createColaborator"
              type="button"
              variant="primary"
              block
            >
              <i class="fas fa-sign-in-alt"></i> Cadastrar colaborador
            </b-button>
 
 
        </b-form>
      </div>
    </div>
</template>

<script>
import api from "../../services/api"
// import router from "../main"

export default {
  data() {
    return {
      newColaborator: {
        name: "",
        surname: "",
        email: "",
        role: "",
        tel: "",
        companyID: this.$route.params.companyID
      },
    }
  },
  methods: {
    createColaborator() {
        // Enviar dados para requisição
        api.post("/companyProfile/:companyID/createColaborator", this.newColaborator).then(() => {
            alert("Colaborador criado com sucesso!")
            this.$router.go(-1)
        }).catch((error) => {
            alert(error)
        })
    },
    register() {},
 
  }
}
</script>
