
/* This file is for building the tables and inserting starting data into MariaDB.
This file does not need to be included with the website files. */

-- BUILD PARKING SPACE TABLE
CREATE TABLE `parking`(
`parking_id`int(11) NOT NULL AUTO_INCREMENT,
`status` bit DEFAULT 0 NOT NULL,
`latitude`double(12,9) NOT NULL,
`longitude`double(12,9) NOT NULL,
`longitude`double(12,9) NOT NULL,
`elevation` int(11) NOT NULL, 
PRIMARY KEY (`parking_id`),
UNIQUE KEY (`parking_id`)
) ENGINE =INNODB;
