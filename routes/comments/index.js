'use strict'
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var comments;

mongodb.MongoClient.connect('mongodb://localhost:27017/expsample',function(err,db){
  comments = db.collection('comments');
});

router.route('/comments').get(function(req,res,next){
  comments.find().toArray(function(err,list){
    res.json(list);
  });
})
.post(function(req,res,next){
  comments.insert({
    contents: req.body.contents,
    userId: 1,
    regDate: new Date()
  });
  res.status(201).json();
});


module.exports = router;
