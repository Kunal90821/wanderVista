import session from "express-session";
import passport from "passport";
import User from "../models/userModel.js";
import { Strategy as LocalStrategy } from "passport-local";
import { handleAuthenticationError } from "../utils/handleErrors.js";


// Session configuration

export const configureSession = (app) => {
    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,     // helps to prevent cross-side scripting (XSS)
            sameSite: 'lax'     // helps to prevent CSRF attacks
        }
    }));
};


// Passport configuration

export const configurePassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    // Creating new local strategy
    passport.use(new LocalStrategy(User.authenticate()));

    // Serializing user, no longer used with jwt but kept for compatibility
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserializing user
    passport.deserializeUser((id,done) => {
        User.findById(id)
            .then(user => done(null,user))
            .catch(err => done(err,null));
    });

};


// Middleware for authentication check

export const isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        handleAuthenticationError(res);
    }
};