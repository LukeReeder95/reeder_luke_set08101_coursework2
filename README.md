reeder_luke_set08101_coursework2
For setting up and running the server, firstly need to install NodeJs from: https://nodejs.org/en/
Then need to download and install MongoDB from: https://www.mongodb.com/
Using the command prompt, navigate to the app folder and run the command: npm install
This should install the node modules needed for the app

Open another command prompt and navigate to mongoDB/bin and run using: mongo
then type: use blogposts
to switch the database to the blogposts database

While leaving the database running, in the first command prompt run: nodemon
This should start the server and allow you to connect to the site using localhost:3000
