'use strict';

var PORT_NUMBER = 3000;

var express = require('express');
var logger = require('morgan');
var responseTime = require('response-time');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var comments = require('./routes/comments');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(logger('dev'));
app.use(responseTime());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(errorHandler());
app.use('/api', comments);

io.on('connection',function(socket){
  console.log('user connected');
  socket.on('chat message', function(message){
    console.log('message: ' + message);
  });
});
http.listen(PORT_NUMBER, function(){
  console.log("Exaple app is listening at port number %s", PORT_NUMBER);
});
