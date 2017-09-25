function Departure(timeStamp, origin, tripID, destination, scheduledTime, lateness, track, status){ 
	this.timeStamp = timeStamp;
	this.origin = origin;
	this.tripID = tripID;
	this.destination = destination;
	this.scheduledTime = scheduledTime;
	this.lateness = lateness;
	this.track = track;
	this.status = status;
}
module.exports = Departure; 

Departure.prototype.toString = function(){
	console.log("============\nDeparture Created\n------------\nTimeStamp: " + this.timeStamp + "\nOrigin: " + this.origin + "\nTripID: " + this.tripID + "\nDestination: " + this.destination + "\nScheduled Time: " + this.scheduledTime + "\nLateness: " + this.lateness + "\nTrack: " + this.track + "\nStatus: " + this.status + "\n============\n");
}