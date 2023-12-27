import session from "express-session";
import passport from "passport";
import User from "../models/userModel.js";
import { Strategy as LocalStrategy } from "passport-local";

// Session configuration

export const configureSession = (app) => {
    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 24 * 60 *60,
        },
    }));
};


// Passport configuration

export const configurePassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // Creating new local strategy
    passport.use(new LocalStrategy(User.authenticate()));

    // Serializing user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserializing user
    passport.deserializeUser((id,done) => {
        User.findById(id)
            .then(user => {
                done(null,user);
            })
            .catch(err => {
                done(err,null);
            });
    });

};