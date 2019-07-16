var http = require('http');
var fs = require('fs');

fs.readFile('index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(80);
});

/*
var server = http.createServer(function(req, res){
	//teste
});

var express = require('express');
var app = express();


var path = require('path');

app.get('/', function(req, res) {
	   
  res.send('Olá, meu nome é Gustavo');
});

app.listen(80, function () {
     
	   console.log('My name is Gustavo');
});
*/


