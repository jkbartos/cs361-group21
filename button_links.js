/* This file is to be used to navigate pages if a hyperlink is not wanted
Store this file in the Public directory and reference it in the context.jsscripts section of each js script */

// The page where the user can add obstacles to the obstacle table when passing in obstacle type from a drop-down and entering latitude and longitude
function gotoAddObstacles() {
    window.location = '/obstacles/add'
}

// The page where the user can test if the data base returns obstacles when passing in a a search radius and a starting latitude and longitude
function gotoObstacles() {
    window.location = '/obstacles'
}

// The home page of the website
function gotoHome() {
    window.location = '/'
}
