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

  // Reservation confirmation email content
  const reservationResponse = {
    from: 'test9072686@gmail.com',
    subject: 'Reservation Confirmation',
    to: body.email,
    html: `
      <h1>Dear ${body.firstName},</h1>
      <p>Thank you for making a reservation with us. Below are the details of your reservation:</p>
      <ul>
        <li>First Name: ${body.firstName}</li>
        <li>Last Name: ${body.lastName}</li>
        <li>Email: ${body.email}</li>
        <li>Mobile Number: ${body.mobileNumber}</li>
        <li>Check-in Date: ${body.checkIn}</li>
        <li>Check-out Date: ${body.checkOut}</li>
        <li>Number of Persons: ${body.persons}</li>
        <li>Room Type: ${body.roomType}</li>
      </ul>
      <p>We look forward to welcoming you!</p>
      <p>Best regards,</p>
      <p>The Reservation Team</p>
    `
  };

  // Check the data to determine the response type
  if (body.complaint) {
    // Send the complaint email
    config.sendMail(complaintOptions, function(error, result) {
      if (error) {
        return res.json({ ok: false, msg: error });
      }

      return res.json({
        ok: true,
        msg: 'Complaint email sent successfully'
      });
    });
  } else if (body.reservation) {
    // Send the reservation confirmation email
    config.sendMail(reservationResponse, function(error, result) {
      if (error) {
        return res.json({ ok: false, msg: error });
      }

      return res.json({
        ok: true,
        msg: 'Reservation confirmation email sent successfully'
      });
    });
  } else {
    // Send the general response email
    config.sendMail(responseOptions, function(error, result) {
      if (error) {
        return res.json({ ok: false, msg: error });
      }

      return res.json({
        ok: true,
        msg: 'General response email sent successfully'
      });
    });
  }
};

module.exports = {
  sendEmail
};
