function searchObstaclesByLocationAndRadius() {
    var p_rad = document.getElementById('radius').value
    var p_lat = document.getElementById('deg_lat').value
    var p_long = document.getElementById('deg_long').value
    window.location = '/user_story_10/search/results/?p_radius=' + encodeURI(p_rad) + '&p_deg_lat=' + encodeURI(p_lat) + '&p_deg_long=' + encodeURI(p_long)
}