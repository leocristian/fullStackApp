<template>
    <div sm="5" class="d-flex justify-content-center align-items-center">
      <div class="col-4">
        <h2 class="text-center mb-5 title-sendEmail">Enviar email</h2>
        <b-form>
          <b-form-group
            label="Assunto"
            label-for="assunto"
            >
              <b-form-input
                id="subject"
                type="text"
                autocomplete="off"
                v-model="mail.subject"
              ></b-form-input>
            </b-form-group>
 
            <b-form-group
              label="Mensagem"
              label-for="mensagem"
            >
 
              <b-form-input
                id="message"
                type="text"
                placeholder="Digite sua mensagem"
                v-model="mail.message"
              ></b-form-input>
            </b-form-group>
 
            <b-button v-on:click="sendEmail"
              type="button"
              variant="primary"
              block
            >
              <i class="fas fa-sign-in-alt"></i> Enviar
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
      mail: {
        subject: "",
        message: "",
        colaboratorID: this.$route.params.colaboratorID
      },
      companyID: this.$route.params.companyID,
        }
    },
    methods: {
        sendEmail() {
            console.log("Rota: " +  this.$route.params.colaboratorID)
            console.log(this.mail.colaboratorID);
            api.post(`/companyProfile/${this.companyID}/sendEmail/${this.mail.colaboratorID}`, this.mail).then(() => {
                alert("Email enviado com sucesso !");
                this.$router.go(-1)
            }).catch((error) => {
                alert("Erro ao enviar email! " + error)
            })
        }
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

</style>