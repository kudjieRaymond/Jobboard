# Jobboard

A job board for companies to post job ads

How to Setup

Make sure You have NODE JS installed on your system.

For storage we use Mongo DB.

There are two folders: Server Folder & Client Folder

Open your terminal ;
Navigate to Server Folder
Run `cp .env.example .env`
Set up the mongo db url in the .env file. eg: mongodb://localhost/bezkoder_db
Set as well other values in the newly create .env file
Run `node server.js`

Open another terminal ; Navigate to Client Folder and Run `npm run serve

Navigate in your browser to http://localhost:8080/ to view the app
