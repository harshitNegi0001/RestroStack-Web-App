import axios from "axios";
import dotenv from 'dotenv';

export const sendEmail = async (userEmail, subject,mailData) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {

        sender: { name: "RestroStack", email: process.env.OTP_SENDER_EMAIL },
        to: [{ email: userEmail }],
        subject: subject,
        htmlContent: mailData
        
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return true;
  } catch (error) {
    // console.error("Brevo API Error:", error.response ? error.response.data : error.message);
    return false;
  }
};