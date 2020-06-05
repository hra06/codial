const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')


// Authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email,password,done){
        // find a user and establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding the user-->passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Email/Password');
                return(null,false);
            }
            return done(null,user);
        });
    }
));


// Serializing the user to decide which key in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserializing the user from the kry in cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user----->passport');
            return done(err);
        }
        return done(null,user);
    });
});

// check if user is authencticated
passport.checkAuthentication = function(req,res,next){
    // if the user is sign in then pass on the request to next function which is cntrollerr
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;