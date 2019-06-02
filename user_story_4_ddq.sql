CREATE TABLE `users`(
`user_id`int(11) NOT NULL,
`first_name`varchar(255),
`last_name`varchar(225),
PRIMARY KEY (`user_id`)
) ENGINE =INNODB;

CREATE TABLE `destinations`(
`vehicle_id`int(11) NOT NULL,
`step_id`int(11) NOT NULL,
`instruction`varchar(255),
`start_lat`double(16,14),
`start_lon`double(16,14),
`end_lat`double(16,14),
`end_lon`double(16,14),
`duration`varchar(255),
`distance`varchar(255),
PRIMARY KEY (`vehicle_id`,`step_id`)
) ENGINE =INNODB;


-- BUILD stip_tags FUNCTION
DROP FUNCTION IF EXISTS strip_tags;
DELIMITER |
CREATE FUNCTION strip_tags( Dirty varchar(4000) )
RETURNS varchar(4000)
DETERMINISTIC 
BEGIN
  DECLARE iStart, iEnd, iLength int;
    WHILE Locate( '<', Dirty ) > 0 And Locate( '>', Dirty, Locate( '<', Dirty )) > 0 DO
      BEGIN
        SET iStart = Locate( '<', Dirty ), iEnd = Locate( '>', Dirty, Locate('<', Dirty ));
        SET iLength = ( iEnd - iStart) + 1;
        IF iLength > 0 THEN
          BEGIN
            SET Dirty = Insert( Dirty, iStart, iLength, '');
          END;
        END IF;
      END;
    END WHILE;
    RETURN Dirty;
END;
|
DELIMITER ;
SELECT strip_tags('this <html>is <b>a test</b>, nothing more</html>');
