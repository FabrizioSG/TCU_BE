const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");


async function sendEmail(user, password) {
    const msg = {
        to: user,
        from: 'calculaduratcu408@gmail.com',
        subject: 'Reestablecer contraseña',
        templateId: 'd-520a4acad6d54ff09d0896218f5ec5a2',
        dynamic_template_data: {
          password: password,
        },
      };
    try {
      await sgMail.send(msg);
      return  { message: `SENT`};
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data: error,
          });
    }
  }
  
  module.exports = {
    sendEmail
  }
