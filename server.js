var fetch = require('node-fetch');
var Departure = require('./Departure.js');
var fs = require('fs');
var $ = jQuery = require('jquery');
require('./jquery.csv.js');

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const app = express();
const server = app.get('/', function(req, res){ res.sendFile(__dirname + '/index.html');  })
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.use(express.static(__dirname)); 
var io = socketIO(server);

var departures = [];

io.on('connection', function(socket){
	console.log("Client Connected");
	socket.emit('departures', departures);
});

getData();
setInterval(getData, 1000);

function getData(){
	fetch('http://developer.mbta.com/lib/gtrtfs/Departures.csv')
		.then(function(res) {
			return res.text();
		}).then(function(csv){			
			$.csv.toArrays(csv, {}, function(err, data) {
				departures = [];
				for(var i=1, len=data.length; i<len; i++) {
					var newDept = new Departure (data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7])
					departures.push(newDept);
				}
			});
		});
	io.emit('departures', departures);	
};