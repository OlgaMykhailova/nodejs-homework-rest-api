require("dotenv").config();

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAIL_SENDEER_ADDRESS } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    
  try {
    const email = { ...data, from: EMAIL_SENDEER_ADDRESS };
    const result = await sgMail.send(email);
    console.log(result);
    return true;
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendEmail;
