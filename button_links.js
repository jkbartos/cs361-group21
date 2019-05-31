/* This file is for navigating pages without the use of hyper-links.
Store this file in the public directory and include it when making js url definitions. */


// The page where the user can add obstacles to the obstacle table when passing in obstacle type from a drop-down and entering latitude and longitude
function gotoAddObstacles() {
    window.location = '/obstacles/add'
}

// The page where the user can test if the data base returns obstacles when passing in a a search radius and a starting latitude and longitude
function gotoGetObstacles() {
    window.location = '/obstacles/search'
}

// The page with a table that shows all obstacles when ariving from a different page or from add_obstacle, the table shows the data returned from getObstacles
function gotoObstacles() {
    window.location = '/obstacles'
}

// The page where the user can set a destination
function gotoSetDestination() {
    window.location = '/destinations/set'
}

// The page where the user can test setting a destination
function gotoDestinations() {
    window.location = '/destinations'
}

// The home page of the website
function gotoHome() {
    window.location = '/'
}


