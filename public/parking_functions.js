/* This file is to be used to by the addParking section.
Store this file in the Public directory and reference it in the context.jsscripts section of each obstacles js call definition */

// This function is called when the user clicks submit on the getParking page.
// The input fields must have the IDs of 'radius', 'deg_lat' and 'deg_lon'
function searchParkingByLocationAndRadius() {
    var p_rad = document.getElementById('radius').value;
    var p_lat = document.getElementById('deg_lat').value;
    var p_lon = document.getElementById('deg_lon').value;
    if (!p_lat || !p_lon || !p_rad) {
        alert("Inputs must not be blank.");
    }
	else if (p_rad < 0) {
		alert("Radius must be positive.");
	}
    else {
        window.location = '/parking/search/results/?par_radius=' + encodeURI(p_rad) + '&par_deg_lat=' + encodeURI(p_lat) + '&par_deg_long=' + encodeURI(p_lon);
    }
}


// This function is called when the user clicks submit on the add_parking page.
// The input fields must have the IDs of deg_lat, deg_lon, space_avail.
// The exiting values of the parking table are on the webpage in a hidden table with field names of spaces_lat,
// spaces_lon.  This simulates the vehicle already knowing what parking spaces have been added previously
// so that it doesn't try to add a duplicate parking space.
function addParking() {
    var p_lat = document.getElementById('deg_lat').value;
    var p_lon = document.getElementById('deg_lon').value;
	var p_elev = document.getElementById('ft_elev').value; 
    var p_avail = document.getElementById('space_avail').value;

    var spaces_deg_lat = document.getElementsByName('spaces_lat');
    var spaces_deg_lon = document.getElementsByName('spaces_lon');
	var spaces_ft_elev = document.getElementsByName('spaces_elev');
    var dup_error = 0;

    for (var j = 0, n = spaces_deg_lat.length; j < n; j++) {
        if (p_lat === spaces_deg_lat[j].value && p_lon === spaces_deg_lon[j].value && p_elev === spaces_ft_elev) {
            dup_error++;
        }
    }

    if (!p_lat || !p_lon || !p_elev || !p_avail) {
        alert("Inputs must not be blank. The vehicle will not send Null data.");
    }
	else if (dup_error > 0) {
		alert("This obstacle has already been reported. The vehicle will not sent repeated records.");
	}
    else {
        window.location = '/parking/add/submit?par_deg_lat=' + encodeURI(p_lat) + '&par_deg_long=' + encodeURI(p_lon) + '&par_ft_elev=' + encodeURI(p_elev) + '&par_avail=' + encodeURI(p_avail);
    }
}


// This function is called when the user clicks the continue
// on the reserve_parking page. Input field must be filled in with valid parking id.

// Function takes the provided ID and sends it to the appropriate route for
// query execution
function reserveParkingByID() {

    var p_id = document.getElementById('p_id').value;
    var p_status = 1;
    if (!p_id) {
        alert("Input must not be blank.");
    }
    else {
        window.location = '/parking/reserve/submit/?p_id=' + encodeURI(p_id) + '&p_status=' + encodeURI(p_status);
    }
}

//This function is called when a user clicks the reserve parking button and this routes to a dummy page
//The dummy page confirms the selected parking space was reserved
function continueParking() {	
    var p_id = document.getElementById('p_id').value;
    var p_status = 1;
    if (!p_id) {
        alert("Input must not be blank.");
    }
    else {
        window.location = '/parking/reserve/confirmed/?p_id=' + encodeURI(p_id) + '&p_status=' + encodeURI(p_status);
    }	
}


function updateStatus() {

    var p_id = document.getElementById('p_id').value;
    var p_status = document.getElementById('p_status').value;
    if (!p_id || !p_status) {
        alert("Input must not be blank.");
    }
    else {
        window.location = '/parking/update/submit/?p_id=' + encodeURI(p_id) + '&p_status=' + encodeURI(p_status);
    }

}
