const express = require('express');
const router = express.Router();
const Model = require('../models/');
const User = Model.User;
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  res.render('login', {title:"Login"})
})

router.post('/', (req, res)=>{
  User.findOne({where: {username: req.body.username}})
  .then(user=>{
    bcrypt.compare(req.body.password, user.password)
    .then(result=>{
      if(result){
        req.session.loggedIn = true
        res.redirect('/')
      }else{
        res.render('login', {title:"Login"})
      }

    })

  }).catch(err=>{
    res.render('login', {title:"Login"})

  })

})

module.exports = router;
