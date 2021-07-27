import nodemailer from 'nodemailer'

function createSendMail(mailConfig) {

  const transporter = nodemailer.createTransport(mailConfig);

  return async function sendMail({ to, subject, text, html, attachments }) {
    const mailOptions = { 
        from: mailConfig.auth.user,
        to,
        subject,
        text,
        html,
        attachments };
    return await transporter.sendMail(mailOptions)
  }
}

function createSendMailEthereal() {
  return createSendMail({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "joanie.harvey76@ethereal.email",
        pass: "2mwMYS6JeU3A5XHc8r"
    }
  })
}

/*function createSendMailGoogle() {
  return createSendMail({
    service: 'gmail',
    auth: {
      user: 'xxxxx@gmail.com',
      pass: 'xxxx'
    }
  })
}*/

const mailethereal = createSendMailEthereal();
//const sendMail = createSendMailGoogle()

export {mailethereal}