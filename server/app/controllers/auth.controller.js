const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
	if (!req.body.firstname) {
		return res.status(422).send({
			message: "firstname is required",
		});
	}
	if (!req.body.lastname) {
		return res.status(422).send({
			message: "firstname is required",
		});
	}

	if (!req.body.password) {
		return res.status(422).send({
			message: "password is required",
		});
	}
	if (!req.body.email) {
		return res.status(400).send({
			message: "email is required",
		});
	}

	req.body.password = await bcrypt.hash(req.body.password, 10);

	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
	});

	user
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User.",
			});
		});
};

exports.login = async (req, res) => {
	if (!req.body.email) {
		return res.status(422).send({
			message: "email is required",
		});
	}

	if (!req.body.password) {
		return res.status(422).send({
			message: "password is required",
		});
	}

	try {
		user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				let payload = { email: req.body.email };

				//create the access token with the shorter lifespan
				let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
					algorithm: "HS256",
					expiresIn: process.env.ACCESS_TOKEN_LIFE,
				});

				//send the access token to the client inside a cookie
				res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
				return res.send({ result: "success", message: "Login successfull" });

				// return res.json({
				// 	result: "success",
				// 	message: "Login successfull",
				// 	accessToken,
				// });
			}
		}

		return res.status(401).send({
			result: "error",
			message: "Incorrect credentials",
		});
	} catch (error) {
		res.status(500).send({
			message: error || "Some error occurred while Logging in.",
		});
	}
};
