/* This file is for testing the data manipulation queries in MariaDB.
This file does not need to be included with the website files. */
 
 -- RETURN OBSTACLE DATA WITHIN x MILES
-- user passes in current lat and longitude values
-- data returned is the lat, long, and obstacle type of all obstacles within x miles
-- each degree lat is approx 69 miles, so 5 miles is 0.07246377 dec degrees
-- each degree long depends on latitude.  At the equator, 1 deg lat is approx 69.172 miles.
-- at 40 degrees lat, 1 deg lon is approx 53 miles.  At the poles 1 degree lat is approx 0 miles.
-- use RADIANS() to get deg lat into radians
-- then the formula for miles in 1 degree long is radians(deg_lat)*69.172
-- so, 5 miles is approx: deg_lat/(radians(deg_lat)*69.172)*5

-- using deg_lat_diff = (1/69)*p_radius;
-- using deg_long_diff = p_radius/(radians(deg_lat)*69.172);
set @p_radius = 5;
set @p_deg_lat = 42.725000;
set @p_deg_long = -84.488000;
select distinct ob.latitude, ob.longitude, ob.obstacle_type
from obstacles ob
where (ob.latitude between @p_deg_lat - (@p_radius/69)
	and @p_deg_lat + (@p_radius/69))	
and (ob.longitude between @p_deg_long - (@p_radius/(radians(@p_deg_lat)*69.172))
	and @p_deg_long + (@p_radius/(radians(@p_deg_lat)*69.172))	

			   
-- RETURN OBSTACLE TYPES FOR DROP DOWN MENU
select distinct ot.obstacle_type
from obstacle_types ot
order by ot.obstacle_type;
			   
-- ADD NEW OBSTACLE TO OBSTACLE TABLE
set @p_ob_type = "Pothole";
set @p_deg_lat = 42.00000000;
set @p_deg_long = -84.00000000;
INSERT INTO obstacles(latitude,longitude,obstacle_type)
values (@p_deg_lat, @p_deg_long, @p_ob_type);
