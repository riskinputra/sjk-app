const express = require('express');
const router = express.Router();
const Model = require('../models/');
const User = Model.User


router.get('/', function (req, res) {
  User.findAll()
  .then(users=>{
    res.render('user_all', {users: users})
  })
})

router.get('/add', function (req, res) {
  res.render('user_add')
})

router.post('/add', function (req, res) {
  let dataInsert = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    status: req.body.status
  }
  
  User.create(dataInsert)
  .then(()=>{
    res.redirect('/users')
  }).catch(err=>{
    console.log(err);
  })
  
})

router.get('/edit/:id', function (req, res){
  User.findOne({where: {id: req.params.id}})
  .then(user=>{
    res.render('user_edit', {user:user})
  })
})


module.exports = router;
