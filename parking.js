/* This file is the js file for each parking feature page.
Store this file in the root directory along with handlebars and package.json */

module.exports = function () {
    var express = require('express');
    var router = express.Router();
	
	function storeNewParkingSpace(req, res, mysql, complete) {
        mysql.pool.query("set @p_deg_lat = " + decodeURI(req.query.par_deg_lat) + "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) 
			+ "; set @p_ft_elev = " + decodeURI(req.query.par_ft_elev) + "; set @p_avail = " + decodeURI(req.query.par_avail) 
			+ "; INSERT INTO parking(latitude,longitude,elevation,status) values(@p_deg_lat, @p_deg_long, @p_ft_elev, @p_avail);", function (error) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    function updateStatus(req, res, mysql, complete) {
        mysql.pool.query("set @p_id = " + decodeURI(req.query.p_id) + "; set @p_status = " + decodeURI(req.query.p_status) + "; UPDATE parking SET status=@p_status WHERE parking_id=@p_id;", function (error) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                complete();
        });
    }

    function getUpdateStatusOptions(res, mysql, context, complete) {
        mysql.pool.query("select 'Vacant' as s_label, '0' as s_id  from dual UNION Select 'Occupied' as s_label, '1' as s_id  from dual order by s_id;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.statusOption = results;
            complete();
        });
    }

    function getAllParkingIDs(res, mysql, context, complete) {
        mysql.pool.query("select distinct parking_id from parking order by parking_id;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.parkingID = results;
            complete();
        });
    }

    function getAllParkingIDsReserve(res, mysql, context, complete) {
        mysql.pool.query("select distinct p.parking_id from parking p where p.status = 0 order by p.parking_id;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.parkingID = results;
            complete();
        });
    }

    function getParking(req, res, mysql, context, complete) {

        mysql.pool.query("set @p_radius = " + decodeURI(req.query.par_radius) + "; set @p_deg_lat = " + decodeURI(req.query.par_deg_lat)
            + "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) 
            + "; select distinct p.parking_id, p.latitude, p.longitude, concat(p.elevation, ' ft') as elevation ,case when p.status = 0 then 'Vacant' when p.status = 1 then 'Occupied' when p.status = 3 then 'Reserved' end AS calc_status, concat(round(sqrt(POWER(abs(@p_deg_lat - p.latitude) * 69, 2) + POWER(abs(@p_deg_long - p.longitude) * radians(@p_deg_lat) * 69.172, 2)), 2), ' mi') as calc_dist from parking p where sqrt(POWER(abs(@p_deg_lat - p.latitude) * 69, 2) + POWER(abs(@p_deg_long - p.longitude) * radians(@p_deg_lat) * 69.172, 2)) < @p_radius and p.status = 0 order by sqrt(POWER(abs(@p_deg_lat - p.latitude) * 69, 2) + POWER(abs(@p_deg_long - p.longitude) * radians(@p_deg_lat) * 69.172, 2)), p.parking_id;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.parkingSpaces = results[3];
            complete();
        });
    }

    function getAllParking(res, mysql, context, complete) {
        mysql.pool.query("select p.parking_id, p.latitude, p.longitude, concat(p.elevation,' ft') as elevation, case when p.status = 0 then 'Vacant' when p.status = 1 then 'Occupied' end AS calc_status, null AS calc_dist from parking p order by calc_dist, parking_id;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.parkingSpaces = results;
            complete();
        });
    }


/* USER STORY 13 */ 

    // Route for displaying parking based on provided lat/long and radius
    router.get('/search/results/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getParking(req, res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('parking', context);
            }
        }
    });

    router.get('/search/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        res.render('get_parking', context);
    });

    //ROUTES FOR USER STORY 14
    router.get('/update/submit/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        updateStatus(req, res, mysql, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getAllParking(res, mysql, context, complete);
            }
            else if (callbackCount >= 2) {
                res.render('parking', context);
            }
        }
    });
	
    router.get('/update/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getAllParkingIDs(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getUpdateStatusOptions(res, mysql, context, complete)
            }
            else if (callbackCount >= 2) {
                res.render('update_parking', context);
            }
        }
    });

/* ROUTES FOR USER STORY 15 */ 
    router.get('/reserve/submit/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        updateStatus(req, res, mysql, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getAllParking(res, mysql, context, complete);
            }
            else if (callbackCount >= 2) {
                res.render('parking', context);
            }
        }
    });
	

    router.get('/reserve/confirmed', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
	context.p_id = decodeURI(req.query.p_id);
	res.render('reservation_confirmed', context);
    });

    router.get('/reserve/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getAllParkingIDsReserve(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('reserve_parking', context);
            }
        }
    });


    //ROUTES FOR ADDING PARKING
    router.get('/add/submit/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        storeNewParkingSpace(req, res, mysql, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getAllParking(res, mysql, context, complete);
            }
            else if (callbackCount >= 2) {
                res.render('parking', context);
            }
        }
    });

    router.get('/add/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getAllParking(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('add_parking', context);
            }
        }
    });

    // Parking home page
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');


        getAllParking(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('parking', context);
            }

        }
    });
	
	return router;
}();
