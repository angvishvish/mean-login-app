var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {

        // tell passport which id to use for passport
        console.log('serializing user:',user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {

        return done(null, user[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            // if the user is not found
            if(!user[username]) {
                return done('User not found', false);
            }

            if(isValidPassword(user[username], user[password])) {
                return done('Invalid password', false);
            }

            // succesfull login in
            console.log('Successfull login done!');
            return done(null, user[username]);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true; // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // check if the user already exits
            if(user[username]) {
                return done('Username already taken', false);
            }

            // add user to db
            user[username] = {

                username: username,
                password: createHash(password);
            };
            return done(null, user[username]);

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
