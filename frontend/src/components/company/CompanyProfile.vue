<template>
    <div class="container md-2">

        <h2 v-if="colaborators.length == 0" class="text-center mb-5 title-login">Empresa não possui colaboradores</h2>

        <h2 v-else class="text-center mb-5 title-login">Lista de colaboradores</h2>
        <!-- <button type="button" class="btn" @click="showModal">Novo colaborador</button> -->
        <b-button v-on:click="createColaborator" variant="outline-primary" style="margin-left: 920px;">Novo colaborador</b-button>
        <div v-for="(colaborator, index) in colaborators" :key="index">
            <b-card :title="colaborator.name + ' ' + colaborator.surname">
                <b-card-text>Email: {{ colaborator.email }}</b-card-text>
                <b-card-text>Ára de atuação: {{ colaborator.role }}</b-card-text>
                <b-card-text>Contato: {{ colaborator.tel }}</b-card-text>
                <b-button v-on:click="sendMail(colaborator._id)" variant="outline-primary">Enviar Email</b-button>
                <b-button class="btn btn-outline-warning" variant="outline-secondary" style="margin-left: 20px;" v-on:click="editProfile(colaborator._id)">Editar perfil</b-button>
                <b-button v-on:click="deleteColaborator(index)" variant="outline-danger" style="margin-left: 600px;">Excluir colaborador</b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
    import api from "../../services/api"

    export default {
        data() {
            return { 
                colaborators: [], 
                companyID: this.$route.params.id 
            }
        },
        created() {
            console.log("company id: " + this.companyID)
            api.get(`companyProfile/${this.companyID}`).then((response) => {
                this.colaborators = response.data

                console.log(this.colaborators)
            })
        },
        methods: {
            createColaborator() {
                this.$router.push(this.companyID + "/createColaborator")
            },
            deleteColaborator(index) {

                var colaborator = this.colaborators[index]

                console.log({ colaborator })
                // this.$router.push(this.companyID + `/deleteColaborator/${colaborator._id}`)
                api.delete(`/companyProfile/${this.companyID}/deleteColaborator/${colaborator._id}`).then(() => {
                    alert("Colaborador deletado com sucesso!")
                    this.$router.go()
                }).catch(() => {
                    alert("Erro ao deletar colaborador!")
                })
            },
            sendMail(colaboratorID) {
               this.$router.push(`${this.companyID}/sendEmail/${colaboratorID}`)
            },
            editProfile(colaboratorID) {
                this.$router.push(`${this.companyID}/editColaborator/${colaboratorID}`)
            }
        }
    }
</script>


<style>

</style>