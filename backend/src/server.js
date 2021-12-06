
const express = require("express")
const server = express()

const ColaboratorController = require("./controllers/ColaboratorController")
const colaboratorController = new ColaboratorController()

const CompanyController = require("./controllers/CompanyController")
const Colaborator = require("./models/Colaborator")
const Company = require("./models/Company")
const companyController = new CompanyController()

const port = 8000

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.post("/login", (req, res) => {
    const { username, password } = req.body

    console.log(username)

    // Autenticar usuário

})

server.get("/dashboard", async (req, res) => {
    const allCompanies = await companyController.readAll()

    res.send(allCompanies)
})

server.get("/dashboard/companyProfile/:companyID", async (req, res) => {
    const companyID = req.params.companyID
    console.log(companyID);
    const colaborators = await colaboratorController.read()

    res.send(colaborators)
})


server.post("/createCompany", async (req, res) => {
    const { name, address, site, area, tel } = req.body
    
    const newCompany = new Company(name, address, site, area, tel)

    const insert = await companyController.create(newCompany)

    console.log(`Insert company: ${insert}`);
    return res.sendStatus(200)
})

server.post("/dashboard/companyProfile/:companyID/createColaborator", async (req, res) => {
    const { name, surname, email, role, tel } = req.body
    const companyID = req.params.companyID

    const newColaborator = new Colaborator(name, surname, email, role, tel, companyID)
    
    await colaboratorController.create(newColaborator)
    
    return res.sendStatus(200)
})

server.listen(port, ()=>{ console.log(`Server is running (http://localhost:${port})`) })
