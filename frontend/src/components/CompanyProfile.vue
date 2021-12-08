<template>
    <div class="container md-2">

        <h2 class="text-center mb-5 title-login">Lista de colaboradores</h2>
        <!-- <button type="button" class="btn" @click="showModal">Novo colaborador</button> -->
        <b-button v-on:click="newColaborator" variant="outline-primary" style="margin-left: 920px;">Novo colaborador</b-button>
        <div v-for="(colaborator, index) in colaborators" :key="index">
            <b-card :title="colaborator.name">
                <b-card-text>Email: {{ colaborator.email }}</b-card-text>
                <b-card-text>Ára de atuação: {{ colaborator.role }}</b-card-text>
                <b-card-text>Contato: {{ colaborator.tel }}</b-card-text>
                <b-button variant="outline-primary">Enviar Email</b-button>
                <b-button variant="outline-danger" style="margin-left: 780px;">Excluir colaborador</b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
    import api from "../services/api"

    export default {
        data() {
            return { colaborators: [], companyID: this.$route.params.id }
        },
        created() {
            console.log("company id: " + this.companyID)
            api.get(`companyProfile/${this.companyID}`).then((response) => {
                this.colaborators = response.data

                console.log(this.colaborators)
            })
        },
        methods: {
            newColaborator() {
                this.$router.push(this.companyID + "/createColaborator")

            }
        }
    }
</script>


<style>

</style>