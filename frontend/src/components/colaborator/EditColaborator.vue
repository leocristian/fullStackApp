<template>
    <div sm="5" class="d-flex justify-content-center align-items-center login">
      <div class="col-4">
        <h2 class="text-center mb-5 title-login">Editar dados de colaborador</h2>
        <b-form>
          <b-form-group
            label="Nome"
            label-for="name"
            >
              <b-form-input
                id="name"
                type="text"
                autocomplete="off"
                v-model="colaborator.newName"
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
                v-model="colaborator.newSurname"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
            label="Email"
            label-for="Email"
            >
              <b-form-input
                id="Email"
                type="text"
                autocomplete="off"
                v-model="colaborator.newEmail"
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
                v-model="colaborator.newRole"
              ></b-form-input>
            </b-form-group>
 
 
            <b-form-group
            label="Contato"
            label-for="contato"
            >
              <b-form-input
                id="contato"
                type="text"
                autocomplete="off"
                v-model="colaborator.newTel"
              ></b-form-input>
            </b-form-group>
            
            <b-button v-on:click="editColaborator"
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
      colaborator: {
        newName: "",
        newSurname: "",
        newEmail: "",
        newRole: "",
        newTel: "",
      }
    }
  },
  methods: {
     editColaborator() {
        // Enviar dados para requisição
        api.put(`/companyProfile/${this.$route.params.companyID}/editColaborator/${this.$route.params.colaboratorID}`, this.colaborator).then(() => {
            alert("Dados editados com sucesso!")
            this.$router.go(-1)
        }).catch((error) => {
            alert("E-mail já utilizado!!")
            console.log(error);
        })
    }
  }
}
</script>
