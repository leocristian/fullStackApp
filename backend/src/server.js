
const express = require("express")
const server = express()

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

server.post("/createCompany", async (req, res)=> {
    
    const companyObj = req.body

    try {
        
        const create = await companyController.create(companyObj)

        console.log(create)

        return res.send({ create })
    } catch (error) {
        console.log(error)
    }

})

server.post("/createColaborator")

server.listen(port, ()=>{ console.log(`Server is running (http://localhost:${port})`) })
