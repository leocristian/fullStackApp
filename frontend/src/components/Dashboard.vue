<template>
    <div class="container mt-2">
        
        <h1>Empresas cadastradas</h1>
        <b-button v-on:click="newCompany" variant="outline-primary">Cadastrar empresa</b-button>
        
        <div v-for="(company, index) in allCompanies" :key="index">
            <b-card :title="company.name">
                <!-- <b-card-text>Endereço</b-card-text> -->
                <b-card-text>{{ company.site }}</b-card-text>
                <!-- <b-card-text>Área de atuação</b-card-text> -->
                <!-- <b-card-text>Contato</b-card-text> -->
                <b-button variant="outline-secondary" v-on:click="showProfile(company._id)">Ver perfil</b-button>
                <b-button class="btn btn-outline-warning" variant="outline-secondary" style="margin-left: 20px;" v-on:click="editProfile(company._id)">Editar perfil</b-button>
                <b-button v-on:click="deleteCompany(company._id)" variant="outline-danger" style="margin-left: 800px;">Excluir empresa</b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
import api from "../services/api"
// import router from "../main"

export default {
  data() {
    return {
      allCompanies: [],
    }
  },
  created(){
      api.get("/dashboard").then((response) => {
          this.allCompanies = response.data
      })
  },
  methods: {
      showProfile(companyID) {
            this.$router.push(`/companyProfile/${companyID}`)
      },
      newCompany() {
          this.$router.push("/createCompany")
      },
      deleteCompany(companyID) {
          api.delete(`dashboard/deleteCompany/${companyID}`).then((response) => {
              alert("Empresa deletada com sucesso!")
              console.log(response);
              this.$router.go()
          }).catch((error) => {
              console.log(error);
          })
      }
  }
}
</script>

<style>

</style>