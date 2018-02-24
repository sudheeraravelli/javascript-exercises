var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var stripe = require('stripe')("sk_test_EulX188fQND5gcJWDgNiGQfR");

// show the home page (will also have our login links)
router.get('/', function(req, res) {
    res.render('index.ejs', { message: req.flash('loginMessage') });
});

// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user: req.user
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================


// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// SIGNUP =================================


// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


// google ---------------------------------

// send to google to do the authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
router.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


// google ---------------------------------

// send to google to do the authentication
router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

// the callback after google has authorized the user
router.get('/connect/google/callback',
    passport.authorize('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

//payment using stripe
// router.post('/subscribe', function(req,res){
// 	var token = req.body.stripeToken;
// 	var chargeAmount = req.body.chargeAmount;
// 	var id = req.body.id
// 	var charge = stripe.plans.create({
// 		name: "Basic Plan",
// 	  	id: "basic-monthly",
// 	  	interval: "month",
// 	  	currency: "usd",
// 	  	amount: 2000,
// 	},function(err, plan){
// 		if(err){
// 			console.log("card dec");
// 		}else{
// 			console.log(plan);
// 			console.log("success and updting")
// 			updateObj = {billing:"ACTIVE"}
// 			User.update(
// 				{"_id": id},
// 			 	{$set: {"billing": "ACTIVE","billingId":plan.id}},
// 			 	{"multi": true} , function(err, model) {
// 				if(err){
// 					console.log(err);
// 				}
// 				res.redirect('/profile');
// 				console.log(plan)
// 			})
// 		}
// 	});
// 	console.log("success")
// })

router.post('/subscribe', function(req,res){
	var id = req.body.id
	var email = req.body.email;
	var token = req.body.stripeToken;
	var customer = stripe.customers.create({
	  email: email,
	  source: token
	}, function(err, customer) {
	    if(err){
	    	return done(err);

	    }else{
	    	console.log(customer)
	    	stripe.subscriptions.create({
			  customer: customer.id,
			  items: [
			    {
			      plan: "basic-monthly",
			    },
			  ],
			}, function(err, subscription) {
				if(err){
					return done(err);
				}else{
					updateObj = {billing:"ACTIVE"}
					User.update(
						{"_id": id},
					 	{$set: {"billing": "ACTIVE","billingId":subscription.id}},
					 	{"multi": true} , function(err, model) {
						if(err){
							return err;
						}
						res.redirect('/profile');

					})
				}
			});
	    }
	});

})


//payment using stripe
router.post('/unsubscribe', function(req,res){
	var id = req.body.id;
	var billingId = req.body.billingId;
	console.log(billingId);
	stripe.subscriptions.del(billingId,
	  function(err, confirmation) {
	    if(err){
	    	return err;
	    }
	    else{
			User.update(
				{"_id": id},
			 	{$set: {"billing": "SUSPENDED"}},
			 	{"multi": true} , function(err, model) {
				if(err){
					return err;
				}
				else{
					res.redirect('/profile');
				}
			})
	    }
	  }
	);
})


module.exports = router;

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}