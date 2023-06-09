const { request, response } = require('express');
const nodeMailer = require('nodemailer');

// Function to send the email and respond to the client
const sendEmail = (req = request, res = response) => {
  let body = req.body;

  // Email configuration
  let config = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'test9072686@gmail.com',
      pass: 'alratqniiglkgwdo'
    }
  });

  // Complaint email content
  const complaintOptions = {
    from: body.email,
    subject: 'Received Complaint',
    to: 'test9072686@gmail.com',
    text: body.mssg
  };

  // Response email content
  const responseOptions = {
    from: 'test9072686@gmail.com',
    subject: 'Courtesy Message',
    to: body.email,
    text: `Dear Customer,\n\nThank you for reaching out to us. We have received your complaint and our team is reviewing it. We will get back to you as soon as possible with a solution.\n\nWe appreciate your patience.\n\nBest regards,\nThe Support Team`
  };

  config.sendMail(complaintOptions, function(error, result) {
    if (error) {
      return res.json({ ok: false, msg: error });
    }
    
    // Send the response email to the client
    config.sendMail(responseOptions, function(responseError, responseResult) {
      if (responseError) {
        return res.json({ ok: false, msg: responseError });
      }

      return res.json({
        ok: true,
        msg: 'Email sent successfully'
      });
    });
  });
};

module.exports = {
  sendEmail
};
