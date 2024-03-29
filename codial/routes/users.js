const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

//using passport authentication
router.get('/profile/:id' , passport.checkAuthentication , usersController.profile_user);

router.post('/update/:id' , passport.checkAuthentication , usersController.update);

router.get('/profile' , passport.checkAuthentication , usersController.profile);

//router.get('/profile' , usersController.profile);

router.get('/sign-up' , usersController.signUp);

router.get('/sign-in' , usersController.signIn);

router.post('/create' , usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

//router.post('/create-session' , usersController.createSession);

router.get('/sign-out' , usersController.destroySession);


//router.get('/logout' , usersController.logOut);

module.exports = router;