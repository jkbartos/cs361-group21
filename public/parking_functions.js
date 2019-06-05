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
	var spaces_ft_elev = document.getElementByName('spaces_elev');
    var dup_error = 0;

    for (var j = 0, n = others_deg_lat.length; j < n; j++) {
        if (p_lat === others_deg_lat[j].value && p_lon === others_deg_lon[j].value && p_elev === others_ft_elev) {
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
