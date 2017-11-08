const express = require('express');
const router = express.Router();
const Model = require('../models/');
const Sjk = Model.SuratJalan
const User = Model.User
const Vehicle = Model.Vehicle
const Customer = Model.Customer

router.get('/', function (req, res) {
  Sjk.findAll({
    include: [Vehicle, User, Customer]
  })
  .then(sjks=>{
    // console.log(sjks[0])
    res.render('sjk',{sjks: sjks, title:"Surat Jalan Kendaraan"})
  })
})

router.get('/add', function (req, res) {
  let arrPromise = [
    User.findAll({
      where: {status: 'driver'}
    }),
    Vehicle.findAll(),
    Customer.findAll()
  ]

  Promise.all(arrPromise)
  .then(values=>{
    res.render('sjk_add',{drivers: values[0], vehicles: values[1], customers: values[2], title:"Add Surat Jalan Kendaraa"})
  })
})

router.post('/add', function (req, res){
  Sjk.create(req.body)
  .then(()=>{
    res.redirect('/sjk')
  }).catch(err=>{
    res.render('/sjk/add')
  })
})

router.get('/edit/:id', function (req, res){
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
      one: values[3],
      title: 'Edit Surat Jalan Kendaraan'
    })
  })
})

router.post('/edit/:id', function (req, res){
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

router.get('/delete/:id', function(req, res){
  Sjk.destroy({
    where: {id: req.params.id}
  })
  .then(()=>{
    res.redirect('/sjk')
  }).catch(err=>{
    res.redirect('/sjk')
  })
})

module.exports = router;
