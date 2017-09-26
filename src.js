function GetTime(epochTime){
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

function GetFormattedDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month + "-" + day + "-" + year;
}

socket = io();
socket.on('connect', function(){
	socket.on('departures', function(departures){
		var northTable = document.getElementById("northStationdeparturesTable");
		var southTable = document.getElementById("southStationdeparturesTable");
		clearTable(northTable);
		clearTable(southTable);
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		while(departure = departures.shift()){
			if(departure.origin == "North Station"){
				var row = northTable.insertRow(-1);
			}

			if(departure.origin == "South Station"){
				var row = southTable.insertRow(-1);
			}

			//Carrier
			var Carrier = row.insertCell(0);
			Carrier.classList.add('Carrier');
			Carrier.innerHTML = "MBTA";

			//Time
			var Schedule = row.insertCell(1);
			Schedule.classList.add('Schedule');
			Schedule.innerHTML = GetTime(departure.scheduledTime);

			//Destination
			var Destination = row.insertCell(2);
			Destination.classList.add('Destination');
			Destination.innerHTML = departure.destination;

			//Train #
			var Trip = row.insertCell(3);
			Trip.classList.add('Trip');
			Trip.innerHTML = departure.tripID;
			

			//Track #
			var Track = row.insertCell(4);
			Track.classList.add('Track');
			Track.innerHTML = departure.track;

			//Status
			var Status = row.insertCell(5);
			Status.classList.add('Status');
			Status.innerHTML = departure.status;
			if(departure.status == "Delayed" || departure.status == "Late" || departure.status == "Hold" || departure.status == "Cancelled"){
				Status.classList.add("Late");
			}
			else{
				Status.classList.add("OnTime");
			}

			var date = new Date(0);
			date.setUTCSeconds(departure.timeStamp);
			
			document.getElementById("NCurrentWeekDay").innerHTML = days[date.getDay()];
			document.getElementById("NCurrentDate").innerHTML = GetFormattedDate(date);
			document.getElementById("NCurrentTime").innerHTML = GetTime(departure.timeStamp);
			document.getElementById("SCurrentWeekDay").innerHTML = days[date.getDay()];
			document.getElementById("SCurrentDate").innerHTML = GetFormattedDate(date);
			document.getElementById("SCurrentTime").innerHTML = GetTime(departure.timeStamp);
		}

	});
	

	socket.on('disconnect', function(){
		
	});
});

function clearTable(table){
	while(table.rows.length > 3){
		table.deleteRow(table.rows.length-1);
	}
}
