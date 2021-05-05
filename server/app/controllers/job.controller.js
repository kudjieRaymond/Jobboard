const Job = require("../models/job.models");

// Create and Save a new Job
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		return res.status(422).send({
			message: "title is required",
		});
	}
	if (!req.body.description) {
		return res.status(422).send({
			message: "description is required",
		});
	}
	if (!req.body.company) {
		return res.status(422).send({
			message: "company is required",
		});
	}
	if (!req.body.url) {
		return res.status(422).send({
			message: "Job url is required",
		});
	}

	//create job
	const job = new Job({
		title: req.body.title,
		description: req.body.description,
		company: req.body.company,
		salary: req.body.salary || "Not Specified",
		url: req.body.url,
	});

	job
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Job.",
			});
		});
};

// Retrieve and return all jobs from the database.
exports.findAll = (req, res) => {
	Job.find()
		.then((jobs) => {
			res.send(jobs);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving jobs.",
			});
		});
};

// Find a single job with a jobId
exports.findOne = (req, res) => {
	Job.findById(req.params.jobId)
		.then((job) => {
			if (!job) {
				return res.status(404).send({
					message: "Job not found with id " + req.params.jobId,
				});
			}
			res.send(job);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Job not found with id " + req.params.jobId,
				});
			}
			return res.status(500).send({
				message: "Error retrieving Job with id " + req.params.jobId,
			});
		});
};

// Update a job identified by the jobId in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.title) {
		return res.status(422).send({
			message: "job title required empty",
		});
	}
	if (!req.body.description) {
		return res.status(422).send({
			message: "description is required",
		});
	}
	if (!req.body.company) {
		return res.status(422).send({
			message: "company is required",
		});
	}
	if (!req.body.url) {
		return res.status(422).send({
			message: "Job url is required",
		});
	}

	// Find note and update it with the request body
	Job.findByIdAndUpdate(
		req.params.jobId,
		{
			title: req.body.title,
			description: req.body.description,
			company: req.body.company,
			salary: req.body.salary || "Not Specified",
			url: req.body.url,
		},
		{ new: true }
	)
		.then((job) => {
			if (!job) {
				return res.status(404).send({
					message: "Job not found with id " + req.params.jobId,
				});
			}
			res.send(job);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Job not found with id " + req.params.jobId,
				});
			}
			return res.status(500).send({
				message: "Error updating job with id " + req.params.jobId,
			});
		});
};

// Delete a job with the specified jobId in the request
exports.delete = (req, res) => {
	Job.findByIdAndRemove(req.params.jobId)
		.then((job) => {
			if (!job) {
				return res.status(404).send({
					message: "Job not found with id " + req.params.jobId,
				});
			}
			res.send({ message: "Job deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "Job not found with id " + req.params.jobId,
				});
			}
			return res.status(500).send({
				message: "Could not delete job with id " + req.params.jobId,
			});
		});
};
