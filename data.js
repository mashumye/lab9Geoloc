'use strict';
var mc = require('mongodb').MongoClient;

function insertData(data){
    mc.connect('mongodb://localhost:27017/geodb', function(err, db){
        if(err) throw err;        
        db.collection('locations').insert(data);
            db.close();
         
    }); 
}
function getByName(name){
    return new Promise(function(resolve,reject) {
        mc.connect('mongodb://localhost:27017/geodb', function(err, db){       
        if(err) throw err;
        db.collection('locations').find({name:{'$regex':name,'$options':'i'}}).toArray(function(err, doc){
            if(err) {
                throw err; 
                reject(err);               
            }            
            console.log('x:'+doc);            
            resolve(doc);
            db.close();
        });   
    }); 
  });
}
function getData(category,currentLong,currentLat){
  return new Promise(function(resolve,reject) {
        mc.connect('mongodb://localhost:27017/geodb', function(err, db){
        console.log("long from route:"+currentLong);
        if(err) throw err;
        db.collection('locations').find({category:{'$regex':category,'$options':'i'}, coords: {'$near':[ Number(currentLong), Number(currentLat)],'$maxDistance':0.1}})
                .toArray(function(err, doc){
            if(err) {
                throw err; 
                reject(err);               
            }            
            console.log('x:'+doc);
            //result = doc;
            //console.log('res x:'+result);
            resolve(doc);
            db.close();
        });   
    }); 
  });
}

module.exports ={getData:getData,insertData,getByName:getByName};