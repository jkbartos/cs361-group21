-- BUILD DESTINATION TABLE
CREATE TABLE `destinations`(
`vehicle_id`int(11) NOT NULL,
`step_id`int(11) NOT NULL,
`street_name`varchar(255),
`duration_min`int(11),
`distance_mi`double(11,1),
PRIMARY KEY (`vehicle_id`,`step_id`)
) ENGINE =INNODB;
