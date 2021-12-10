require('dotenv').config()

class MailController {

    ColaboratorController = require("./ColaboratorController")
    
    nodemailer = require("nodemailer")

    
    constructor() {
        this.colaboratorController = new this.ColaboratorController()
        this.transporter = this.nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "leonardocristian@ufpi.edu.br",
                pass: "0804100160leo"
            }

        })
    }
    
    async sendEmail(mail) {
        const colaboratorEmail = await this.colaboratorController.readOne(mail.colaboratorID)

        console.log("email encontrado: " + colaboratorEmail);

        this.transporter.sendMail({
            from: "leonardoscristian@ufpi.edu.br>",
            to: colaboratorEmail,
            subject: mail.subject,
            text: mail.message
        }).then(() => {
            console.log("Email enviado com sucesso!");
        }).catch(() => {
            console.log("Erro ao enviar email!");
        })
    }
}

module.exports = MailController