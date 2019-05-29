/* This file is to be used to navigate pages if a hyperlink is not wanted
Store this file in the Public directory and reference it in the context.jsscripts section of each page's js */

// The page where the user can add obstacles to the obstacle table when passing in obstacle type from a drop-down and entering latitude and longitude
function gotoUserStory10Add() {
    window.location = '/user_story_10/add'
}

// The page where the user can test if the data base returns obstacles when passing in a a search radius and a starting latitude and longitude
function gotoUserStory10() {
    window.location = '/user_story_10'
}

// The home page of the website
function gotoHome() {
    window.location = '/'
}
