const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  // res.render('index')
  res.send('di user')
})


module.exports = router;
