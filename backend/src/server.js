
const express = require("express")
const server = express()

const port = 8000

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get("/home", (req, res) => {
    res.send("Homepage")
})

server.get("/dashboard", (req, res) => {
    res.send("Dashboard")
})

server.get("/companyProfile", (req, res) => {
    res.send("Company profile")
})

server.post("/createCompany", (req, res) => {
    const { name, address, area, site, tel } = req.body

    console.log(name)
    
    try {
        const newCompany = new Company(name, address, area, site, tel)
        companyController.create(newCompany)
        return res.status(200)
    } catch (error) {
        console.log("Erro ao criar empresa")
    }

})

server.post("/createColaborator", (req, res) => {
    const { name, surname, tel, role } = req.body

    console.log(name)
    
    try {
        const newColaborator = new Colaborator(name, surname, tel, role)
        colaboratorController.create(newColaborator)
        return res.status(200)
    } catch (error) {
        console.log("Erro ao criar empresa")
    }

})

server.listen(port, ()=>{ console.log(`Server is running (http://localhost:${port})`) })
