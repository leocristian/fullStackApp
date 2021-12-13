<template>
    <div class="container mt-2">
        
        <h2 v-if="allCompanies.length == 0" class="text-center mb-5 title-login">Não existem empresas cadastradas</h2>

        <h2 v-else class="text-center mb-5 title-login">Lista de empresas</h2>
        <div class="container" style="margin: 20px;">
            <b-button v-on:click="newCompany" variant="outline-primary" style="margin-left: 820px;">Cadastrar empresa</b-button>
            <b-button v-on:click="previousPage" variant="outline-danger" style="margin-left: 15px;">Sair</b-button>
        </div>
        
        <div v-for="(company, index) in allCompanies" :key="index" style="margin-bottom: 20px;">
            <b-card :title="company.name">
                <b-card-text>{{ company.address }}</b-card-text>
                <b-card-text>{{ company.site }}</b-card-text>
                <b-card-text>{{ company.area }}</b-card-text>
                <b-card-text>{{ company.tel }}</b-card-text>
                <b-button variant="outline-secondary" v-on:click="showProfile(company._id)">Listar Colaboradores</b-button>
                <b-button class="btn btn-outline-warning" variant="outline-secondary" style="margin-left: 20px;" v-on:click="editProfile(company._id)">Editar perfil</b-button>
                <b-button v-on:click="deleteCompany(company._id)" variant="outline-danger" style="margin-left: 600px;">Excluir empresa</b-button>
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
      },
      editProfile(companyID) {
          this.$router.push(`/editCompany/${companyID}`)
      },
      previousPage() {
          this.$router.go(-1)
      }
  }
}
</script>

<style>

</style>