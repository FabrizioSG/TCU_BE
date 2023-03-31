const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");


async function sendEmail(user, password) {
    const msg = {
        to: user,
        from: 'fsalazarg@est.utn.ac.cr',
        subject: 'Reset password',
        templateId: 'd-6311a4662cd544d28b292cb704b86455',
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
            data: error
          });
    }
  }
  
  module.exports = {
    sendEmail
  }