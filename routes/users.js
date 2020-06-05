const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-in',usersController.SignIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);

// use passport as a middle to auth
router.post('/create-session',passport.authenticate(
        'local',
        {failureRedirect:'/user/sign-in'},
    ),usersController.createSession)

module.exports = router;