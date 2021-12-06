
const express = require("express")
const server = express()

const ColaboratorController = require("./controllers/ColaboratorController")
const colaboratorController = new ColaboratorController()

const CompanyController = require("./controllers/CompanyController")
const companyController = new CompanyController()

const port = 8000

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// server.get("/home", (req, res) => {
//     res.send("Homepage")
// })

// server.get("/dashboard", (req, res) => {
//     res.send("Dashboard")
// })

// server.get("/companyProfile", (req, res) => {
//     res.send("Company profile")
// })

server.post("/createCompany", companyController.create)
server.post("/createColaborator", colaboratorController.create)

server.listen(port, ()=>{ console.log(`Server is running (http://localhost:${port})`) })
