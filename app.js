'use strict';

var PORT_NUMBER = 3000;

var express = require('express');
var logger = require('morgan');
var responseTime = require('response-time');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var comments = require('./routes/comments');
var comments2 = require('./routes/comments2');

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

var sockets = [];

io.on('connection',function(socket){
  sockets.push(socket);
  console.log('user connected');
  socket.on('message', function(message){
    console.log('message: ' + message);
    console.log('sockets: ' + sockets.length);
    var mes = {contents: message};
    comments2.insert(mes);
    io.emit('receiveMessage', mes);
  });
});
http.listen(PORT_NUMBER, function(){
  console.log("Exaple app is listening at port number %s", PORT_NUMBER);
});
