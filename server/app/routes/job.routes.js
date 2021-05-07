module.exports = (app, verify) => {
	const jobs = require("../controllers/job.controller.js");

	//create a new job
	app.post("/jobs", verify, jobs.create);

	//get all jobs
	app.get("/jobs", jobs.findAll);

	app.get("/jobs/external", jobs.external);

	//get user jobs
	app.get("/jobs/user", verify, jobs.findAllUserJobs);

	// Retrieve a single Job with jobId
	app.get("/jobs/:jobId", jobs.findOne);

	// Update a Job with JobId
	app.put("/jobs/:jobId", verify, jobs.update);

	// Delete a Job with JobId
	app.delete("/jobs/:jobId", verify, jobs.delete);
};
