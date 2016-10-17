var express = require('express');
var router = express.Router();
var dataLayer =require('../data.js');
var qs = require('querystring');
var url = require('url');

var data;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Geolocation App' });
});

router.get('/addLocation', function(req, res, next) {

  res.render('addLocation', { title: 'Add Locations' });
});

router.post('/addLocation', function(req, res, next) {
    data= {name:req.body.name,category:req.body.category,coords:[Number(req.body.longitude),Number(req.body.latitude)]};
    dataLayer.insertData(data);
  res.render('addLocation', { title: 'Added successfully.' });
});

//
router.get('/search', function(req, res, next) {
  res.render('searchNearby', { title: 'Search nearby locations to me' });
});

router.get('/locations', function(req, res, next) {
 var locations;
 var qdata=url.parse(req.url).query
 var button =qs.parse(qdata)['btnLocations'];
 if(button =='Search by name'){
   var name =qs.parse(qdata)['name'];
   dataLayer.getByName(name).then(function(dt){
     // console.log("result read: "+dao.result);
      locations=dt;
      
      console.log("data read: "+locations);
      
      res.render('locations', {locations:locations,title:'Nearby Locations'});
  });
 }
 else {
  var longitude =qs.parse(qdata)['longitude'];  
  var latitude =qs.parse(qdata)['latitude'];
  var category =qs.parse(qdata)['category'];
  //var locations=[{name:'A',catagory:'C',location:[3.4,4.66]}];
  
  dataLayer.getData(category,longitude,latitude).then(function(dt){
     // console.log("result read: "+dao.result);
      locations=dt;
      
      console.log("data read: "+locations);
      
      res.render('locations', {locations:locations,title:'Nearby Locations'});
  });
 }
  
});


module.exports = router;
