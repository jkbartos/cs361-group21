/* This file is to be used to by the user story 10 get obstacles section.
Store this file in the Public directory and reference it in the context.jsscripts section of each obstacles js call definition */

// This function is called when the user clicks submit on the get_obstacles page.
//The input fields must have the IDs of 'radius', 'deg_lat' and 'deg_long'
function searchObstaclesByLocationAndRadius() {
    var p_rad = document.getElementById('radius').value
    var p_lat = document.getElementById('deg_lat').value
    var p_long = document.getElementById('deg_long').value
    window.location = '/obstacles/search/results/?p_radius=' + encodeURI(p_rad) + '&p_deg_lat=' + encodeURI(p_lat) + '&p_deg_long=' + encodeURI(p_long)
}

// This function is called when the user clicks submit on the add_obstacles page.
// The input fields must have the IDs of deg_lat, deg_lon, ob_type 
function addObstacle() {
    var p_lat = document.getElementById('deg_lat').value
    var p_lon = document.getElementById('deg_lon').value
    var p_ob_type = document.getElementById('ob_type').value

    var others_deg_lat = document.getElementsByName('others_lat');
    var others_deg_lon = document.getElementsByName('others_lon');
    var others_ob_type = documet.getElementsByName('others_ob_type');
    var dup_error = 0;

    for (var j = 0, n = others_lat.length; j < n; j++) {
        if (p_lat === others_lat[j].value && p_lon === others_lon[j].value && p_ob_type === others_ob_type[j].value) {
            dup_error++;
        }
    }


    if ((!p_lat || 0 === p_lat.length) || (!p_lot || 0 === p_lot.length) || (!p_ob_type || 0 === p_ob_type.length)) {
        alert("Inputs must not be blank.");
    }
    else {
        if (dup_error > 0) {
            alert("This obstacle has already been reported, this entry will be ignored.");
        }
        else {
            window.location = '/obstacles/add/submit?p_deg_lat=' + p_lat + '&p_deg_long=' + p_lon + '&p_ob_type=' + encodeURI(p_ob_type)
        }
    }    
}
