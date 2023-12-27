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
