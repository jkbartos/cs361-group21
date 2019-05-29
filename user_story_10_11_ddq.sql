
/* This file is for building the tables and inserting starting data into MariaDB.
This file does not need to be included with the website files. */

-- BUILD OBSTACLE TYPES TABLE
CREATE TABLE `obstacle_types`(
`id`int(11) NOT NULL AUTO_INCREMENT,
`obstacle_type`varchar(255) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY (`obstacle_type`)
) ENGINE =INNODB;

-- BUILD OBSTACLES TABLE
CREATE TABLE `obstacles`(
`obstacle_id`int(11) NOT NULL AUTO_INCREMENT,
`latitude`double(12,9) NOT NULL,
`longitude`double(12,9) NOT NULL,
`obstacle_type`varchar(255) NOT NULL,
PRIMARY KEY(`obstacle_id`),
FOREIGN KEY(`obstacle_type`) REFERENCES `obstacle_types`(`obstacle_type`),
UNIQUE KEY (`latitude`, `longitude`, `obstacle_type`)
) ENGINE=INNODB;

-- INSERT STARTING DATA INTO OBSTACLE TYPES TABLE
INSERT INTO obstacle_types(obstacle_type)
values("Road Closure"),("Lane Closure"),("Pothole"),("Debris");

-- INSERT STARTING DATA INTO OBSTACLES TABLE
INSERT INTO obstacles(latitude,longitude,obstacle_type)
values (44.558763,-123.279775,"Pothole"),
(44.558309,-123.279733,"Pothole"),
(44.557535,-123.280625,"Road Closure"),
(44.557451,-123.280486,"Pothole"),
(44.55976,-123.274599,"Lane Closure"),
(42.730786,-84.486936,"Road Closure"),
(42.730122,-84.485154,"Pothole"),
(42.730135,-84.485178,"Pothole"),
(42.730148,-84.485204,"Pothole"),
(42.730164,-84.485233,"Pothole"),
(42.725783,-84.488307,"Lane Closure");
