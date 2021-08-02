import twilio from 'twilio'

const acctSid = ' '
const authToken = ' '


const twilioClient = twilio(acctSid, authToken)

export {twilioClient}