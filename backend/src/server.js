
const express = require("express")
const server = express()

const ColaboratorController = require("./controllers/ColaboratorController")
const colaboratorController = new ColaboratorController()

const CompanyController = require("./controllers/CompanyController")
const companyController = new CompanyController()

const MailController = require("./controllers/MailController")
const mailController = new MailController()

const Colaborator = require("./models/Colaborator")
const Company = require("./models/Company")
const Mail = require("./models/Mail")

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

server.delete("/dashboard/deleteCompany/:companyID", async (req, res) => {

    const companyID = req.params.companyID

    console.log(companyID);
    await companyController.destroy(companyID)
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

server.post("/companyProfile/:companyID/sendEmail/:colaboratorID", async(req, res) => {
    const { subject, message, colaboratorID } = req.body

    console.log("User encontrado: " + colaboratorID);
    const mail = new Mail(subject, message, colaboratorID)

    await mailController.sendEmail(mail)

    return res.sendStatus(200)
})
server.listen(port, ()=>{ console.log(`Server is running (http://localhost:${port})`) })
