// export USERNAME_EMAIL=fake-password
// export PASSWORD_EMAIL=fake-password
// echo $PASSWORD_EMAIL

const nodemailer = require('nodemailer');

function sendEmail(dest, rawMsg, cb){
  const username = process.env.USERNAME_EMAIL
  const password = process.env.PASSWORD_EMAIL
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: username,
      pass: password
    }
  })
  
  // console.log(rawMsg)
  let subject = `[ORDER ID:${rawMsg.id} CUSTOMER: ${rawMsg.Customer.name}]`
  let messages = `
  <h1>SURAT JALAN NO:${rawMsg.id}</h1>
  Details:<br>
  <br>No: ${rawMsg.id}
  <br>Customer Name: ${rawMsg.Customer.name}
  <br>Task: ${rawMsg.id}
  <br>Destination: ${rawMsg.Customer.address}
  <br>Location: <a href='${rawMsg.Customer.map}'>${rawMsg.Customer.map}</a>`;

  var mailOptions = {
    from: username,
    to: dest,
    subject: subject,
    html: messages
  };
  
  // console.log(mailOptions);
  
  // return mailOptions;

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      cb(error)
    } else {
      console.log('Email sent: ' + info.response);
      cb(info.response)
    }
  })
  
}

// console.log(sendEmail('capung@gmail.com', 'halooo'))

module.exports = sendEmail;
