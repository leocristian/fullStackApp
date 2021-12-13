require('dotenv').config()

const ColaboratorController = require("./ColaboratorController")
const colaboratorController = new ColaboratorController()

class MailController {

    
    nodemailer = require("nodemailer")

    
    constructor() {
        this.transporter = this.nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }

        })
    }
    
    async sendEmail(mail) {
        console.log(process.env.EMAIL);
        const colaborator = await colaboratorController.readOne(mail.colaboratorID)

        console.log("email encontrado: " + colaborator.email);

        this.transporter.sendMail({
            from: "leonardoscristian@ufpi.edu.br>",
            to: colaborator.email,
            subject: mail.subject,
            text: mail.message
        }).then(() => {
            console.log("Email enviado com sucesso!");
        }).catch((error) => {
            console.log("Erro ao enviar email!" + error);
        })
    }
}

module.exports = MailController
