
const express = require("express")
const server = express()

const jwt = require("jsonwebtoken")
const authConfig = require("./config/auth")

const UserController = require("./controllers/UserController")
const userController = new UserController()

const ColaboratorController = require("./controllers/ColaboratorController")
const colaboratorController = new ColaboratorController()

const CompanyController = require("./controllers/CompanyController")
const companyController = new CompanyController()

const MailController = require("./controllers/MailController")
const mailController = new MailController()

const Colaborator = require("./models/Colaborator")
const Company = require("./models/Company")
const Mail = require("./models/Mail")
const User = require("./models/User")

const port = 8000

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
  });

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.post("/login", async (req, res) => {

    const { email, password } = req.body

    const userLogged = new User(email, password)
    const user = await userController.readOne(userLogged)

    if(!user){
        res.sendStatus(404)
    }else{

        user.password = undefined
        const idLogged = user._id
        console.log("id logado: " + idLogged);
        console.log("Secret: " + authConfig.secret);
        // const token = jwt.sign({ id: idLogged }, authConfig.secret)

        res.redirect("/dashboard")
    }
})

server.post("/signup", async (req, res) => {
    const { email, password } = req.body
    
    const newUser = new User(email, password)

    const userExists = await userController.verify(newUser)
 
    if (userExists) {
        console.log("Usuário já existe");
        res.sendStatus(303)
    } else {
        const user = await userController.create(newUser)
        res.sendStatus(200)
    }

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

server.put("/editCompany/:companyID", async (req, res) => {
    const { newName, newAddress, newSite, newArea, newTel } = req.body
    const companyID = req.params.companyID

    const newCompany = new Company(newName, newAddress, newSite, newArea, newTel)

    if (await companyController.verify(newCompany)) {
        return res.sendStatus(409) // Conflict
    } else {
        const company = await companyController.readOne(companyID)
        await companyController.update(company._id, newCompany)
        res.sendStatus(200)
    }
})
server.delete("/dashboard/deleteCompany/:companyID", async (req, res) => {

    const companyID = req.params.companyID

    console.log(companyID);
    await companyController.destroy(companyID)

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

server.put("/companyProfile/:companyID/editColaborator/:colaboratorID", async (req, res) => {
    const { newName, newSurname, newEmail, newRole, newTel } = req.body
    const { companyID, colaboratorID } = req.params

    const newColaborator = new Colaborator(newName, newSurname, newEmail, newTel, newRole, companyID)

    
    if (await colaboratorController.verify(newColaborator)) {
        console.log("Colaborador já existe!!");
        return res.sendStatus(409)
    } else{
        const colaborator = await colaboratorController.readOne(colaboratorID)
        await colaboratorController.update(colaborator._id, newColaborator)
        console.log({colaborator});
        return res.sendStatus(200)
    }

})

server.delete("/companyProfile/:companyID/deleteColaborator/:colaboratorID", async (req, res) => {

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
