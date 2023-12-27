import passport from "passport";
import User from "../models/userModel.js";
import { randomBytes } from 'crypto';



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


// Forgot Password

export const forgotPassword = async(req,res,next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({message : "User not found"});

        //  Generating a reset token and its expiration time

        const resetToken = randomBytes(20).toString('hex');

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        // Sending an email with password reset link

        const resetLink = `http://localhost:${process.env.PORT}/api/reset-password/${resetToken}`;
        const emailSubject = 'Password Reset';
        const emailText = `Click on the following link to reset your password: ${resetLink}`;

        // Use the sendEmail function
        await sendEmail(email, emailSubject, emailText);

        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully",
        });
    } catch(error) {
        res.status(500).json({
            message: "Error during password reset process",
            error: error.message,
        });
    }
};


// Reset password

export const resetPassword = async (req,res,next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if(!user) return res.status(400).json({
            message: `Invalid or expired token`
        });


        //  Set the new password and clear the reset token

        user.setPassword(newPassword, ()=> {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            user.save()
                .then(()=> {
                    res.status(200).json({
                        success: true,
                        message: `Password reset successfully`
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Error saving password',
                        error: error.message
                    });
                });
        });
    } catch(error) {
        res.status(500).json({
            message: 'Error during password reset',
            error: error.message
        });
    };
};
