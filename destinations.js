module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // Need to update this function with VehicleID query once a table is built with vehicle IDs
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


    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["destination_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        res.render('destinations', context);
    });

    return router;
}();
