const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

// create express app
const app = express();
const port = 3000;

//Enable All CORS Requests
const corsOptions = {
	origin: true, //"http://localhost:8080/", // process.env.FRONT_END_URL,
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const dbConfig = require("./config/db");
const mongoose = require("mongoose");

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

require("./app/routes/auth.routes")(app);
const { verify } = require("./app/middleware/auth.middleware");
require("./app/routes/job.routes")(app, verify);

// listen for requests
app.listen(port, () => {
	console.log(`Server is listening on port ${port} `);
});
