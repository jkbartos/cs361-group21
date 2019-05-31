module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // Need to update this function with VehicleID query once a table is built with vehicle IDs
    // This will be used to provide data for a dropdown menu in the form so that the user can select
    // valid vehicle IDs when setting the destination for a vehicle ID.
    function getVehicleIDs(res, mysql, context, complete) {
        mysql.pool.query("SELECT DISTINCT ot.obstacle_type FROM obstacle_types ot order by ot.obstacle_type;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vehicleIDs = results;
            complete();
        });
    }
    
    
    // Need to update this function with destination update query once the destination and vehicle ID tables are built
    // Query should take in the vehicle ID and destination as parameters and should update the destination of the 
    // record for that vehicle ID.
    function updateDestination(req, res, mysql, complete) {
        mysql.pool.query("set @p_deg_lat = " + decodeURI(req.query.par_deg_lat) + "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) + "; set @p_ob_type = " + mysql.pool.escape(decodeURI(req.query.par_ob_type)) + "; INSERT INTO obstacles(latitude,longitude,obstacle_type) values(@p_deg_lat, @p_deg_long, @p_ob_type);", function (error) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }    

    // Need to update this function with destination select query once the destination and vehicle ID tables are built
    // Query should take in the vehicle ID as a parameter and return all of the destination information for that vehicle
    function getSpecificDestination(req, res, mysql, context, complete) {
        mysql.pool.query("SELECT DISTINCT ot.obstacle_type FROM obstacle_types ot order by ot.obstacle_type;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dests = results;
            complete();
        });
    }    

    
    // This gets called by the function that is called after the user clicks submit on the set destination form
    // It should store the destination, pull the destination information for that record and load the destionation handlebar
    router.get('/set/submit/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        updateDestination(req, res, mysql, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getSpecificDestination(req, res, mysql, context, complete);
            }
            else if (callbackCount >= 2) {
                res.render('destinations', context);
            }
        }
    });
    
    
    // This gets called by the function that is called after the user clicks the button on the destinations page
    // that will navigate to the set_destination page.  It needs to return all of the vehicle IDs for the dropdown menu
    // in the set destination form.
    router.get('/set/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getVehicleIDs(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('set_destination', context);
            }
        }
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
