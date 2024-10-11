require('dotenv').config();
const nodemailer = require('nodemailer');
const { resetPasswordTemplate } = require('./mailTemplates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Variable de entorno para el usuario
    pass: process.env.EMAIL_PASS, // Variable de entorno para la contraseña
  },
});

const sendPasswordResetEmail = (toEmail, resetLink) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Resetear contraseña',
      html: resetPasswordTemplate(resetLink),
    };
  
    return transporter.sendMail(mailOptions);
  };
  
  module.exports = {
    sendPasswordResetEmail,
  };

