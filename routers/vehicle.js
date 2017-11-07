const express = require('express');
const router = express.Router();
const Model = require('../models/');

router.get('/', (req, res) => {
  Model.Vehicle.findAll().then(dataVehicle => {
      let dataV = {
        title: 'Vehicle',
        rows: dataVehicle
      }
      res.render('vehicles', dataV)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/add', (req, res) => {
  res.render('vehicles-add', {
    title: 'Vehicles Add'
  })
})

router.post('/add', (req, res) => {
  Model.Vehicle.create(req.body).then(dataVehicle => {
      res.redirect('/vehicles');
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/edit/:id', (req, res) => {
  Model.Vehicle.findById(req.params.id).then(dataVehicle => {
      let dataV = {
        title: 'Vehicle Edit',
        rows: dataVehicle
      }
      res.render('vehicles-edit', dataV)
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
  Model.Vehicle.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dataVehicle => {
      res.redirect('/vehicles')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
  Model.Vehicle.destroy({
      where: {
        id: req.params.id
      }
    }).then(dataVehicle => {
      res.redirect('/vehicles')
    })
    .catch(err => {
      res.send(err)
    })
})



module.exports = router;
