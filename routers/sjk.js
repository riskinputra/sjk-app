const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('sjk')
})

router.get('/add', function (req, res) {
  res.render('sjk_add')
})

router.post('/add', function (req, res){
  console.log(req.body);
  res.send(req.body)
})

module.exports = router;
