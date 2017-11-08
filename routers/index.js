const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  // console.log(req.session.loggedIn);
  res.render('index', {title: 'Home', login:req.session.loggedIn})
})


module.exports = router;
