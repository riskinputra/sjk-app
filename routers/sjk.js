const express = require('express');
const router = express.Router();
const Model = require('../models/');
const Sjk = Model.SuratJalan
const User = Model.User
const Vehicle = Model.Vehicle
const Customer = Model.Customer

//require helper
const cekLogin = require('../helper/ceklogin')
const sendEmail = require('../helper/sendemail')

router.get('/', cekLogin, function (req, res) {
  Sjk.findAll({
    include: [Vehicle, User, Customer]
  })
  .then(sjks=>{
    res.render('sjk',{sjks: sjks, msg:req.query.email})
  })
})

router.get('/add', cekLogin, function (req, res) {
  let arrPromise = [
    User.findAll({
      where: {status: 'driver'}
    }),
    Vehicle.findAll(),
    Customer.findAll()
  ]
  
  Promise.all(arrPromise)
  .then(values=>{
    res.render('sjk_add',{drivers: values[0], vehicles: values[1], customers: values[2]})
  })
})

router.post('/add', cekLogin, function (req, res){
  Sjk.create(req.body)
  .then(()=>{
    res.redirect('/sjk')
  }).catch(err=>{
    res.render('/sjk/add')
  })
})

router.get('/edit/:id', cekLogin, function (req, res){
  let arrPromise = [
    User.findAll({
      where: {status: 'driver'}
    }),
    Vehicle.findAll(),
    Customer.findAll(),
    Sjk.findOne({
      include: [Vehicle, User, Customer],
      where: {id: req.params.id}
    })
  ]
  
  Promise.all(arrPromise)
  .then(values=>{
    res.render('sjk_edit',{
      drivers: values[0], 
      vehicles: values[1], 
      customers: values[2], 
      one: values[3]
    })
  })
})

router.post('/edit/:id', cekLogin, function (req, res){
  // console.log(req.body)
  Sjk.update(req.body,{
    where: {id: req.params.id}
  })
  .then(()=>{
    res.redirect('/sjk')
  }).catch(err=>{
    res.redirect('/sjk')
  })
})

router.get('/delete/:id', cekLogin, function(req, res){
  Sjk.destroy({
    where: {id: req.params.id}
  })
  .then(()=>{
    res.redirect('/sjk')
  }).catch(err=>{
    res.redirect('/sjk')
  })
})

//send Email
router.get('/sendemail/:id', cekLogin, function (req, res) {
  Sjk.findAll({
    include: [Vehicle, User, Customer],
    where: {id: req.params.id}
  })
  .then(sjks=>{
    let dest = sjks[0].User.email
    let rawMsg = sjks[0]
    
    // send email here
    sendEmail(dest, rawMsg, (info)=>{
      let success = info.match(/ok/gi).length;
      if(success==1){
        res.redirect('/sjk'+'?email='+'ok')
        // res.render('sjk',{sjks: sjks, msg: msg})
      }else{
        res.redirect('/sjk'+'?email='+info)
        console.log(info);
        // res.render('sjk',{sjks: sjks, msg: info})
      }
    })
    
  })
})

module.exports = router;
