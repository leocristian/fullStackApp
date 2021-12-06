
class CompanyController {
    cconstructor() {
        // Iniciar banco de dados
    }
    async create(obj) {
        console.log(obj.name)
        return "ok"
    }
}

module.exports = CompanyController