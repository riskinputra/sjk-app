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

  let subject = `[ORDER ID:${rawMsg.id} CUSTOMER: ${rawMsg.Customer.name}]`
  let messages = `
  <table style="border:1px solid black">
    <thead>
      <tr>
        <th colspan="2">SURAT JALAN NO:${rawMsg.id}</th>
      </tr>
    <thead>
    <tbody>
      <tr>
        <td align="right">No : </td>
        <td>${rawMsg.id}</td>
      </tr>
      <tr>
        <td align="right" nowrap>Customer Name : </td>
        <td style="text-transform: capitalize">${rawMsg.Customer.name}</td>
      </tr>
      <tr>
        <td align="right">Task : </td>
        <td style="text-transform: capitalize">${rawMsg.task}</td>
      </tr>
      <tr>
        <td align="right" style="text-transform: capitalize">Destination : </td>
        <td><a href='${rawMsg.Customer.map}'>${rawMsg.Customer.address}</a></td>
      </tr>
    </tbody>
  <table>`;

  var mailOptions = {
    from: username,
    to: dest,
    subject: subject,
    html: messages
  };

  // console.log(mailOptions);
  // cb(200)

  //send mail here
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

module.exports = sendEmail;
