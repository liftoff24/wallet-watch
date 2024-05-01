// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import Strategy from 'passport-google-oauth20'; 
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

passport.use(
    new Strategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, callback) {
            callback(null, profile);
        }
    )
);

passport.serializeUser((user,done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;