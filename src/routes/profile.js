const router = require("express").Router();
const efp = require("express-form-post");
const passport = require("passport");

const { User, Application } = require("../models");
const signupMail = require("../mailer/mail_signup_success");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpdate, massageAttrsForUpdate } = require("../lib/application");

router.post("/update", isLoggedIn, formPostUpdate.middleware(), (req, res, next) => {
	console.log(req.body);
	const { Application } = req.user;

	let attributes = massageAttrsForUpdate(req.body);

	Application.updateAttributes(attributes)
	.then((application) => {
		res.json({ success: true, message: {
			type: "success",
			content: "Test content",
			header: "test header"
		}});
	})
	
});

router.use("/update", (err, req, res, next) => {
	throw err; // temporary
});

module.exports = router;