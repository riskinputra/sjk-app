const express = require('express');
const router = express.Router();
const Model = require('../models/');
const User = Model.User

//require helper
const cekLogin = require('../helper/ceklogin')

router.get('/', cekLogin, function (req, res) {
  User.findAll()
  .then(users=>{
    res.render('user_all', {users: users, title:'Users'})
  })
})

router.get('/add', cekLogin, function (req, res) {
  res.render('user_add', {title: 'User Add'})
})

router.post('/add', cekLogin, function (req, res) {
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
    console.log(err.message)
    res.render('user_add', {
      title: 'User Add',
      msg: err.message
    })
  })

})

router.get('/edit/:id', cekLogin, function (req, res){
  User.findOne({where: {id: req.params.id}})
  .then(user=>{
    res.render('user_edit', {user:user, title:'User Edit'})
  })
})

router.post('/edit/:id', cekLogin, function (req, res){
  let dataInsert = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    status: req.body.status
  }

  User.update(dataInsert, {where: {id: req.params.id}})
  .then(()=>{
    res.redirect('/users')
  }).catch(err=>{
    console.log(err);
  })

})

router.get('/delete/:id', cekLogin, function (req, res){
  User.destroy({where: {id: req.params.id}})
  .then(()=>{
    res.redirect('/users')
  })
})

module.exports = router;
