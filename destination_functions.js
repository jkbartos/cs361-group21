// This file is for functions that get called by submit buttons on forms related to the destination handlebar pages
// see obstacles_functions.js for examples

// This needs to eventually go to the destination/set/submit url passing information
function setWeather() {
    var weather_API = "26ae9e9658c70232ee373f951e757433";
    var city = document.getElementById('city_in').value
    window.location = '/destinations/set/results/?city_in=' + encodeURI(city) + '&appid=' + encodeURI(weather_API)
}

function setDestination() {
    var app_key = "AIzaSyCvZRbzXevwNoq34qgmGYBAx-wFNllQLUc";  //cprumsey21 google API Key  cost $5/1000 requests
    var veh_id = document.getElementById('veh_id').value

    var origin_lat = document.getElementById('origin_lat').value
    var origin_lon = document.getElementById('origin_lon').value

    var dest_addr = document.getElementById('dest_addr').value
    var dest_street = document.getElementById('dest_street').value
    var dest_city = document.getElementById('dest_city').value
    var dest_state = document.getElementById('dest_state').value

    window.location = '/destinations/set/results/?veh_id=' + encodeURI(veh_id) + '&app_key=' + encodeURI(app_key) + '&origin_lat=' + encodeURI(origin_lat) + '&origin_lon=' + encodeURI(origin_lon) + '&dest_addr=' + encodeURI(dest_addr) + '&dest_street=' + encodeURI(dest_street) + '&dest_city=' + encodeURI(dest_city) + '&dest_state=' + encodeURI(dest_state)
}
