// app.route.js

const express = require('express');
const appRoutes = express.Router();

// Require app model in our routes module
let LGA = require('./lga.model');
const _ = require('lodash');

// Defined store route
appRoutes.route('/add').post(function (req, res) {
    let body = _.pick(req.body, ['person_name', 'lga_name', 'phone_number']);
  let lga = new LGA(body);
  lga.save()
    .then(status => {
      res.status(200).json({'status': 'status is added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
appRoutes.route('/').get(function (req, res) {
    LGA.find(function(err, data){
    if(err){
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

// Defined edit route
appRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  LGA.findById(id, function (err, data){
      res.json(data);
  });
});

//  Defined update route
appRoutes.route('/update/:id').post(function (req, res) {
    LGA.findById(req.params.id, function(err, data) {
    if (!data)
      res.status(404).send("data is not found");
    else {
        data.person_name = req.body.person_name;
        data.lga_name = req.body.lga_name;
        data.phone_number = req.body.phone_number;

        data.save().then(data => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
appRoutes.route('/delete/:id').get(function (req, res) {
    LGA.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = appRoutes;
