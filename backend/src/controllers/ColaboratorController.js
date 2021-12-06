
class ColaboratorController {
    cconstructor() {
        // Iniciar banco de dados
    }
    async create (req, res) {
        const colaboratorObj = req.body
    
        try {
            const create = await colaboratorController.create(colaboratorObj)
            return res.send({ create })
        } catch (error) {
            console.log(error);
        }
    }
    async index(req, res) {

    }
}

module.exports = ColaboratorController