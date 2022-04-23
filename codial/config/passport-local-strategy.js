const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

//authenticate using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        //find a user and establish a identity
        User.findOne({email: email} , function(err,user)  {
            // if(err){
            //     req.flash('error',err);
            //     return done(err);
            // }

            // if(!user || user.comparePassword(password) != password){
            //     req.flash('error','Invalid User/Password');
            //     return done(null , false);
            // }

            // return done(null , user);

            if ( user && user.comparePassword( password ) ) {
                // user found, password is correct. do what you want to do
                return done(null, user);
            } else {
                // user not found or wrong password.
                console.log('Invalid Password');
                return done( null, false, req.flash('message', 'Invalid Password') );
            }
        });
    }
));

//serelize the user to decide to which keys to be kept in the cookie
passport.serializeUser(function(user , done){
    done(null, user.id);
});

//deserilizing the user from the key in the cookies
passport.deserializeUser(function(id , done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> passport');
        }

        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed-in user from the session cookie and we are just sending it to the locals for the views.
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;