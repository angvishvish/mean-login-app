var LocalStrategy   = require('passport-local').Strategy;
var bCrypt          = require('bcrypt-nodejs');

//temporary data store
// var user = {};

var mongoose    =  require('mongoose');
var User        = mongoose.model('User');
var Post        = mongoose.model('Post');

module.exports  = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {

        // tell passport which id to use for passport
        console.log('serializing user:',user._id);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function (err, user) {

            if (err) {
                return done(err, false);
            }
            if(!user) {
                return done('User not found', false);
            }

            // we found the user object provided it back to passport
            return done(null, user);
        });

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            // Check for user from the database
            User.findOne({ username: username}, function (err, userObj) {

                User.findOne({username: username}, function (err, user) {

                    if(err) {
                        return done(err, false);
                    }
                    if(!user) {
                        return done('User ' + user + 'not found', false);
                    }

                    if (!isValidPassword(user, password)) {
                        return done('Incorrect password', false);
                    }

                    return done(null, user);
                });

                // if user NOT found
                if (err) {
                    return done(err, false);
                }

                // if user found
                if (userObj) {
                    return done('You are successfully logged in', true);
                }

                var user = new User();
                username: username;
                password: createHash(password)

                user.save(function (err, user) {

                    if(err) {
                        return done(err, false);
                    }
                    if(user) {
                        console.log('Successfully signed up user');
                        return done(null, user);
                    }
                });
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // find a user in mongo with provided username
            User.findOne({ 'username' :  username }, function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);  
                            throw err;  
                        }
                        console.log(newUser.username + ' Registration succesful');    
                        return done(null, newUser);
                    });
                }
            });

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
