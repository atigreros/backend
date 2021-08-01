import twilio from 'twilio'

// const acctSid = ' '
// const authToken = ' '

const acctSid = 'AC61d0bfe0564139ae6669d28f45bd9c45'
const authToken = '945b3b5a05ded5546c5b09e8fbd6d424'

const twilioClient = twilio(acctSid, authToken)

export {twilioClient}