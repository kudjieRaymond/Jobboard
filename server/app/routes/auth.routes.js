module.exports = (app) => {
	const auth = require("../controllers/auth.controller.js");

	app.post("/register", auth.register);

	app.post("/login", auth.login);
};
