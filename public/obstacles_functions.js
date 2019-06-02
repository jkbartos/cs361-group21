/* This file is to be used to by the user story 10 get obstacles section.
Store this file in the Public directory and reference it in the context.jsscripts section of each obstacles js call definition */

// This function is called when the user clicks submit on the get_obstacles page.
//The input fields must have the IDs of 'radius', 'deg_lat' and 'deg_lon'

function searchObstaclesByLocationAndRadius() {
    var p_rad = document.getElementById('radius').value
    var p_lat = document.getElementById('deg_lat').value
    var p_lon = document.getElementById('deg_lon').value
    if (!p_lat || !p_lon || !p_rad) {
        alert("Inputs must not be blank.");
    }
    else {
        if (p_rad < 0) {
            alert("Radius must be positive.");
        }
        else {
            window.location = '/obstacles/search/results/?par_radius=' + encodeURI(p_rad) + '&par_deg_lat=' + encodeURI(p_lat) + '&par_deg_long=' + encodeURI(p_lon)
        }
    }
}


// This function is called when the user clicks submit on the add_obstacles page.
// The input fields must have the IDs of deg_lat, deg_lon, ob_type.
// The exiting values of the obstacle table are on the webpage in a hidden table with field names of others_lat,
// others_lon, and others_ob_type.  This simulates the vehicle already knowing what obstacles have been reported
// so that it doesn't try to report something again.
function addObstacle() {
    var p_lat = document.getElementById('deg_lat').value
    var p_lon = document.getElementById('deg_lon').value
    var p_ob_type = document.getElementById('ob_type').value

    var others_deg_lat = document.getElementsByName('others_lat');
    var others_deg_lon = document.getElementsByName('others_lon');
    var others_ob = document.getElementsByName('others_ob_type');
    var dup_error = 0;

    for (var j = 0, n = others_deg_lat.length; j < n; j++) {
        if (p_lat === others_deg_lat[j].value && p_lon === others_deg_lon[j].value && p_ob_type === others_ob[j].value) {
            dup_error++;
        }
    }

    if (!p_lat || !p_lon || !p_ob_type) {
        alert("Inputs must not be blank. The vehicle will not send Null data.");
    }
    else {
        if (dup_error > 0) {
            alert("This obstacle has already been reported. The vehicle will not sent repeated records.");
        }
        else {
            window.location = '/obstacles/add/submit?par_deg_lat=' + encodeURI(p_lat) + '&par_deg_long=' + encodeURI(p_lon) + '&par_ob_type=' + encodeURI(p_ob_type)
        }
    }
}
