import passport from 'passport';
import LdapStrategy from 'passport-ldapauth' ;
import { ldapConfig } from 'config';

// Stores user in session
passport.serializeUser((user, done) => {
    done(null, user);
});

//Retrieves user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use(new LdapStrategy(ldapConfig, function(user, done){
    done(null, user);
  }));
  