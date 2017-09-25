function Departure(timeStamp, origin, tripID, destination, scheduledTime, lateness, track, status){ 
	console.log(timeStamp);
	this.timeStamp = timeStamp;
	this.origin = origin;
	this.tripID = tripID;
	this.destination = destination;
	this.scheduledTime = this.getTime(scheduledTime);
	this.lateness = lateness;
	this.track = track;
	this.status = status;
}
module.exports = Departure; 

Departure.prototype.toString = function(){
	console.log("============\nDeparture Created\n------------\nTimeStamp: " + this.timeStamp + "\nOrigin: " + this.origin + "\nTripID: " + this.tripID + "\nDestination: " + this.destination + "\nScheduled Time: " + this.scheduledTime + "\nLateness: " + this.lateness + "\nTrack: " + this.track + "\nStatus: " + this.status + "\n============\n");
}

Departure.prototype.getTime = function(epochTime){
	var date = new Date(0);
	date.setUTCSeconds(epochTime);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}