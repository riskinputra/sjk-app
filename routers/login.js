const express = require('express');
const router = express.Router();
const Model = require('../models/');
const User = Model.User;
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
  res.render('login')
})

router.post('/', (req, res)=>{
  User.findOne({where: {username: req.body.username}})
  .then(user=>{
    bcrypt.compare(req.body.password, user.password)
    .then(result=>{
      if(result){
        req.session.loggedIn = true
        res.redirect('/users')
      }else{
        res.render('login')
      }
      
    })
    
  }).catch(err=>{
    res.render('login')
    
  })
  
})

module.exports = router;
