'use strict'
var mongodb = require('mongodb');
var comments;

mongodb.MongoClient.connect('mongodb://localhost:27017/expsample',function(err,db){
  comments = db.collection('comments');
});
module.exports.find = function(callback){
  comments.find().toArray(function(err,list){
    if(callback){
      callback(err.list);
    }
  });
};

module.exports.insert = function(obj){
  comments.insert({
    contents: obj.contents,
    userId: 1,
    regDate: new Date()
  });
};
