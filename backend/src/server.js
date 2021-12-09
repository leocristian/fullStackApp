
const express = require("express")
const server = express()

const ColaboratorController = require("./controllers/ColaboratorController")
const colaboratorController = new ColaboratorController()

const CompanyController = require("./controllers/CompanyController")
const Colaborator = require("./models/Colaborator")
const Company = require("./models/Company")
const companyController = new CompanyController()

const port = 8000

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.post("/login", (req, res) => {
    const { email, password } = req.body

    console.log(email)

    return res.redirect("/dashboard")

})

server.get("/dashboard", async (req, res) => {
    const allCompanies = await companyController.readAll()

    res.send(allCompanies)
})

server.get("/companyProfile/:companyID", async (req, res) => {
    const companyID = req.params.companyID
    console.log(companyID);
    const colaborators = await colaboratorController.read(companyID)

    res.send(colaborators)
})


server.post("/createCompany", async (req, res) => {
    const { name, address, site, area, tel } = req.body
    
    const newCompany = new Company(name, address, site, area, tel)

    const insert = await companyController.create(newCompany)

    console.log(`Insert company: ${insert}`);
    return res.sendStatus(200)
})

server.post("/companyProfile/:companyID/createColaborator", async (req, res) => {
    const { name, surname, email, role, tel, companyID } = req.body
    
    const newColaborator = new Colaborator(name, surname, email, role, tel, companyID)
    
    await colaboratorController.create(newColaborator).then(() => {
        console.log(`${newColaborator.name} (${newColaborator.companyID})`);
    })
    
    return res.sendStatus(200)
})

server.post("/companyProfile/:companyID/deleteColaborator/:colaboratorID", async (req, res) => {

    const colaboratorID = req.params.colaboratorID

    await colaboratorController.destroy(colaboratorID)
    
    return res.sendStatus(200)
})
server.listen(port, ()=>{ console.log(`Server is running (http://localhost:${port})`) })
