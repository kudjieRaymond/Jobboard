module.exports = (app) => {
	const jobs = require("../controllers/job.controller.js");

	//create a new job
	app.post("/jobs", jobs.create);

	//get all jobs
	app.get("/jobs", jobs.findAll);

	// Retrieve a single Job with jobId
	app.get("/jobs/:jobId", jobs.findOne);

	// Update a Job with JobId
	app.put("/jobs/:jobId", jobs.update);

	// Delete a Job with JobId
	app.delete("/jobs/:jobId", jobs.delete);
};
