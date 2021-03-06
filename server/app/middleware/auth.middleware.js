const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

exports.verify = (req, res, next) => {
	let accessToken = req.cookies.jwt;

	//if there is no token stored in cookies, the request is unauthorized
	if (!accessToken) {
		return res.status(403).send();
	}

	let payload;
	try {
		//use the jwt.verify method to verify the access token
		//throws an error if the token has expired or has a invalid signature
		payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

		User.findOne({ email: payload.email }, function (err, user) {
			req.user = user;
			next();
		});
	} catch (e) {
		//if an error occured return request unauthorized error
		return res.status(401).send({ message: "unauthorized" });
	}
};
