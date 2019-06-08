module.exports = function () {
    var express = require('express');
    var router = express.Router();
        

    function getSpecificDestination(mysql, context, complete) {
        mysql.pool.query("SELECT DISTINCT vehicle_id, step_id, distance, duration, start_lat, start_lon, end_lat, end_lon, instruction from destinations where vehicle_id = " + context.veh_id + " order by step_id;", function (error, results, fields) {
            context.dests = results;
            complete();
        });
    }   

    function deleteDestinations(mysql, context, complete) {
        mysql.pool.query("set @veh_id = " + context.veh_id + "; delete from destinations where vehicle_id = @veh_id;", function () {
            complete();
        });

    }

    // Insert into destinations table
    function storeDestinationSteps(mysql, context, complete) {
        var i = 0;
        var count = Object.keys(context.steps).length;
        for (i = 0; i < count; i++) {
            mysql.pool.query("set @veh_id = " + context.veh_id + "; set @step_id = " + (i+1) + "; set @start_lat = " + context.steps[i].start_location.lat + "; set @start_lon = " + context.steps[i].start_location.lng + "; set @end_lat = " + context.steps[i].end_location.lat + "; set @end_lon = " + context.steps[i].end_location.lng + "; set @dist = '" + context.steps[i].distance.text + "'; set @dur = '" + context.steps[i].duration.text + "'; set @instruction = strip_tags('" + context.steps[i].html_instructions + "'); INSERT INTO destinations(step_id,vehicle_id,start_lat,start_lon,end_lat,end_lon,distance,duration,instruction) " + "values(@step_id, @veh_id, @start_lat, @start_lon, @end_lat, @end_lon, @dist, @dur, @instruction);");
        }
        complete();
    }

    // This function will call the api XMLHttpRequest
    function getDirections(req, context, complete) {
        var api_key = decodeURI(req.query.app_key);
        var veh_id = decodeURI(req.query.veh_id);

        var origin_lat = decodeURI(req.query.origin_lat);
        var origin_lon = decodeURI(req.query.origin_lon);

        var dest_addr = decodeURI(req.query.dest_addr);
        var dest_street = decodeURI(req.query.dest_street);
        var dest_city = decodeURI(req.query.dest_city);
        var dest_state = decodeURI(req.query.dest_state);

        var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin_lat + "," + origin_lon + "&destination=" + dest_addr + "+" + dest_street + "+" + dest_city + "+" + dest_state + "&key=" + api_key;
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var req_2 = new XMLHttpRequest();
        req_2.open("GET", url, true);
        req_2.send(null);
        req_2.addEventListener('load', function () {
            var response = JSON.parse(req_2.responseText);
            context.steps = response.routes['0'].legs['0'].steps;
            complete();
        });

    }  
    
    // This gets called by the function that is called after the user clicks submit on the set destination form
    // It should store the destination, pull the destination information for that record and load the destionation handlebar
    router.get('/set/results/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        context.veh_id = decodeURI(req.query.veh_id);
        var mysql = req.app.get('mysql');
        getDirections(req, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                deleteDestinations(mysql, context, complete);
            }
            else if (callbackCount == 2) {
                storeDestinationSteps(mysql, context, complete);
            }
            else if (callbackCount == 3) {
                getSpecificDestination(mysql, context, complete);
            }
            else if (callbackCount == 4) {
                res.render('destinations', context);
            }
        }
    });
    
    // This gets called by the function that is called after the user clicks submit on the set destination form
    // It should store the destination and load the destination_confirmed handlebar 
    router.get('/set/confirmed/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        context.veh_id = decodeURI(req.query.veh_id);
        context.origin_lat = decodeURI(req.query.origin_id);
        context.origin_lon = decodeURI(req.query.origin_lon);
        context.dest_addr = decodeURI(req.query.dest_addr);
        context.dest_street = decodeURI(req.query.dest_street);
        context.dest_city = decodeURI(req.query.dest_city);
        context.dest_state = decodeURI(req.query.dest_state);
        var mysql = req.app.get('mysql');
        getDirections(req, context, complete);
        res.render('destination_confirmed', context);
    });
    
    
    // This gets called by the function that is called after the user clicks the button on the destinations page
    // that will navigate to the set_destination page.  It needs to return all of the vehicle IDs for the dropdown menu
    // in the set destination form.
    router.get('/set/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
       res.render('set_destination', context);
    });

    // This gets called when the user navigates to the destination page from anywhere other than the submit
    // button on the set destination form.  It renders the destinations page, but does not populate any data.
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        res.render('destinations', context);
    });

    return router;
}();
