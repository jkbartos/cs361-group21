/* This file is to be used to by the user story 10 get obstacles section.
Store this file in the Public directory and reference it in the context.jsscripts section of each story_10 page's js */

// This function is called when the user clicks submit on the user_story_10 page.
//The input fields must be named 'radius', 'deg_lat' and 'deg_long'
function searchObstaclesByLocationAndRadius() {
    var p_rad = document.getElementById('radius').value
    var p_lat = document.getElementById('deg_lat').value
    var p_long = document.getElementById('deg_long').value
    window.location = '/user_story_10/search/results/?p_radius=' + encodeURI(p_rad) + '&p_deg_lat=' + encodeURI(p_lat) + '&p_deg_long=' + encodeURI(p_long)
}
