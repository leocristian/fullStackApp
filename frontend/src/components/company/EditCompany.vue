<template>
    <div sm="5" class="d-flex justify-content-center align-items-center login">
      <div class="col-4">
        <h2 class="text-center mb-5 title-login">Editar dados da empresa</h2>
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
                v-model="company.newName"
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
                v-model="company.newAddress"
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
                v-model="company.newSite"
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
                v-model="company.newArea"
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
                v-model="company.newTel"
              ></b-form-input>
            </b-form-group>
            
            <b-button v-on:click="editCompany"
              type="button"
              variant="primary"
              block
            >
              <i class="fas fa-sign-in-alt"></i> Editar dados
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
      company: {
        newName: "",
        newAddress: "",
        newSite: "",
        newArea: "",
        newTel: "",
      }
    }
  },
  methods: {
     editCompany() {
        // Enviar dados para requisição
        api.put(`/editCompany/${this.$route.params.companyID}`, this.company).then(() => {
            alert("Dados editados com sucesso!")
            this.$router.go(-1)
        }).catch(() => {
            alert("Empresa já existe")
        })
    }
 
  }
}
</script>
