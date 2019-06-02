Folder structure is as follows.

./
obstacles.js, destinations.js, project.js, dbcon.js, .gitignore, package.json

./public/
OSU_vertical_1C_B.png, index.html, obstacles_function.js, button_links.js, destination_functions.js

./views/
get_obstacles.handlebars, add_obstacle.handlebars, obstacles.handlebars, destinations.handlebars, 500.handlebars, 404.handlebars, home.handlebars, set_destination.handlebars

./views/layouts
main.handlebars 




Important.
When in the root directory for the first time run these two statements:
npm install
npm install forever
npm install xmlhttprequest



publish the site temporarily using the following:
node project.js 1234

publish the site forever using the following:
./node_modules/forever/bin/forever start project.js 12345

To stop something from running forever use the following:
cd node_modules/forever/bin
forever list
forever stop 0
(the 0 is whatever id the forever is running on. It is the number in brackets in the return of forever list)
forever list  (do this again to make sure that it is no longer running)
cd ..
cd ..
cd ..
(you should be back to the root directory now)
