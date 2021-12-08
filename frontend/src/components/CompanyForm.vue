<template>
    <div sm="5" class="d-flex justify-content-center align-items-center login">
      <div class="col-4">
        <h2 class="text-center mb-5 title-login">Cadastro de empresa</h2>
        <b-form>
          <b-form-group
            label="name"
            label-for="name"
            >
              <b-form-input
                id="name"
                type="text"
                autocomplete="off"
                placeholder="Amazon, Google, Apple..."
                v-model="newCompany.name"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
            label="address"
            label-for="address"
            >
              <b-form-input
                id="address"
                type="text"
                autocomplete="off"
                placeholder=""
                v-model="newCompany.address"
              ></b-form-input>
            </b-form-group>
 
 
            <b-form-group
            label="site"
            label-for="site"
            >
              <b-form-input
                id="site"
                type="text"
                autocomplete="off"
                placeholder="www.com"
                v-model="newCompany.site"
              ></b-form-input>
            </b-form-group>

            <b-form-group
            label="area"
            label-for="area"
            >
              <b-form-input
                id="area"
                type="text"
                autocomplete="off"
                placeholder="Área de atuação"
                v-model="newCompany.area"
              ></b-form-input>
            </b-form-group>
 
 
            <b-form-group
            label="contato"
            label-for="contato"
            >
              <b-form-input
                id="contato"
                type="text"
                autocomplete="off"
                placeholder="1234-5678"
                v-model="newCompany.tel"
              ></b-form-input>
            </b-form-group>
            
            <b-button v-on:click="createCompany"
              type="button"
              variant="primary"
              block
            >
              <i class="fas fa-sign-in-alt"></i> Cadastrar empresa
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
      newCompany: {
        name: "",
        address: "",
        site: "",
        area: "",
        tel: "",
      }
    }
  },
  methods: {
    createCompany() {
        // Enviar dados para requisição
        api.post("/createCompany", this.newCompany).then(() => {
            alert("Empresa cadastrada com sucesso!")
        })
    },
    register() {},
 
  }
}
</script>
