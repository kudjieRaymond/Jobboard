const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
	{
		title: String,
		company: String,
		description: String,
		salary: String,
		url: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Job", JobSchema);
