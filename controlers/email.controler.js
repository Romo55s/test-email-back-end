const { request, response } = require('express');
const nodeMailer = require('nodemailer');

// Funcion para mandar el correo
const sendEmail = (req = request, res = response) => {
  let body = req.body;

  // Protocolo por el cual se va a mandar el correo y la cuenta desde la cual se enviará
  let config = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'test9072686@gmail.com',
      pass: 'alratqniiglkgwdo'
    }
  });

  // Contenido del correo
  const options = {
    from: 'test9072686@gmail.com',
    subject: body.about,
    to: body.email,
    text: body.mssg
  };

  const optionsJson = JSON.stringify(options);

  config.sendMail(options, function(error, result) {
    console.log(options);
    console.log(optionsJson);
    if (error) {
      return res.json({ ok: false, msg: error });
    }
    return res.json({
      ok: true,
      msg: optionsJson
    });
  });
};

module.exports = {
  sendEmail
};