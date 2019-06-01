-- BUILD DESTINATION TABLE
CREATE TABLE `destinations`(
`vehicle_id`int(11) NOT NULL,
`step_id`int(11) NOT NULL,
`instruction`varchar(255),
`duration_min`int(11),
`distance_mi`double(11,1),
PRIMARY KEY (`vehicle_id`,`step_id`)
) ENGINE =INNODB;


-- BUILD stip_tags FUNCTION
delimiter ||
DROP FUNCTION IF EXISTS strip_tags||
CREATE FUNCTION strip_tags( x longtext) RETURNS longtext
LANGUAGE SQL NOT DETERMINISTIC READS SQL DATA
BEGIN
DECLARE sstart INT UNSIGNED;
DECLARE ends INT UNSIGNED;
SET sstart = LOCATE('/', x, 1);
REPEAT
SET ends = LOCATE('\', x, sstart);
SET x = CONCAT(SUBSTRING( x, 1 ,sstart -1) ,SUBSTRING(x, ends +1 )) ;
SET sstart = LOCATE('/', x, 1);
UNTIL sstart < 1 END REPEAT;
return x;
END;
||
delimiter ;
