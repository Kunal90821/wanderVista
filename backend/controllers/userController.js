import passport from "passport";
import User from "../models/userModel.js";



// Register User

export const register = async(req,res,next) => {
    const { username, name, email, password } = req.body;

    const newUser = { username, name, email};

    const user = await User.findOne({username});

    if(user) return res.status(400).json({
        message: 'User already exists. Please try different username'
    });

    User.register(newUser, password, function(err,user) {
        if(err) {
            res.status(500).json({
                err
            });
        } else {
            passport.authenticate("local")(req,res, ()=> {
                res.status(201).json({
                    success: true,
                    user
                });
            });
        }
    });
};


// Login User

export const login = async(req,res,next) => {
    const {username, password} = req.body;

    const user = new User({
        username,
        password
    });

    req.login(user,(err) => {
        if(err) {
            return res.status(500).json({
                err
            });
        } else {
            passport.authenticate("local")(req,res,()=> {
                return res.status(201).json({
                    success: true,
                    user
                });
            });
        }
    });
};


// Logout User

export const logOut = async(req,res,next) => {
    req.logout(err => {
        if(err) {
            return res.status(500).json({
                err
            });
        }
        res.status(201).json({
            success: true,
            message: 'User logged out successfully'
        });
    });
};

