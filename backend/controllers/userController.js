import passport from "passport";
import User from "../models/userModel.js";
import { randomBytes } from 'crypto';
import { sendEmail } from "../utils/sendEmail.js";
import { handleAuthenticationError, handleError } from "../utils/handleErrors.js";
import Blog from "../models/blogModel.js";
import cloudinary from 'cloudinary';


// Register User
export const register = async (req, res, next) => {
    try {
        const { username, name, email, password, avatar } = req.body;

        let avatarData;

        // check if avatar is provided

        if(avatar.length > 0) {
            // Upload avatar to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: 'wanderVista/avatars',
                width: 150,
                crop: 'scale'
            });

            avatarData = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        } else {
            // no avatar provided, skip upload

            avatarData = null;
        }


        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists. Please try a different username or email'
            });
        }

        // Create a new user
        const user = new User({
            username,
            name,
            email,
            avatar: avatarData
        });
        
        // Register user using passport

        User.register(user, password, (err, user) => {
            if (err) return res.status(400).json({ error: err.message });

            passport.authenticate("local")(req,res,() => {
                // Session is created, user is logged in
                return res.status(201).json({
                    success: true,
                    message: "User registered and logged in successfully",
                    user
                });
            });
        });

    } catch (error) {
        handleError(res, error);
    }
};


// Login User

export const login = async(req,res,next) => {

    passport.authenticate("local",(err, user, info) => {
        if (err) return handleError(res,err);
        if( !user) return handleAuthenticationError(res);

        // login user

        req.login(user, (err) => {
            if(err) return handleError(res,err);

            // user is logged in and session is created

            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user
            })
        });
    })(req,res,next);
};


// Logout User

export const logOut = async(req,res,next) => {
    req.logout(err => {
        if(err) return handleError(res,err);

        // Automatically deletes the session cookie

        res.clearCookie("connect.sid");     // default cookie name

        return res.status(200).json({
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
        handleError(res,error);
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
        handleError(res,error);
    };
};


// Get User Details

export const getUserDetail = async (req,res,next) => {

    // Check if the user is authenticated

    try{
        const user = await User.findById(req.user.id);

        return res.status(200).json({
            success: true,
            user
        });
    } catch(error) {
        handleError(res, error);
    }
};


// Update user profile

export const updateProfile = async (req,res,next) => {
    try {
        const newData = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email
        }
        const user = await User.findByIdAndUpdate(req.user.id, newData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: 'User Profile Updated'
        });
    } catch(error) {
        handleError(res,error);
    }
};


// Update User Password

export const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if(newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Password does not match'
            });
        }

        if(oldPassword === newPassword) {
            return res.status(401).json({
                success: false,
                message: 'New password should not be same as old password'
            });
        }

        // Use passport-local-mongoose's changePassword method
        req.user.changePassword(oldPassword, newPassword, (err) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid Old Password Entered'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Password updated successfully'
            });
        });
    } catch (error) {
        handleError(res, error);
    }
};


// Get all users -- ADMIN

export const getAllUsers = async (req,res,next) => {
    
    try {
        if(req.user.role === "admin") {
            const users = await User.find();
            
            return res.status(200).json({
                success: true,
                users
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            });
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Get Single User  -- ADMIN

export const getSingleUser = async (req,res,next) => {
    
    try {
        const { id } = req.params;

        if(req.user.role === 'admin') {
            const user = await User.findById(id);
            res.status(200).json({
                success: true,
                user
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
            });
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Delete User & deleting their blogs --ADMIN

export const deleteUser = async (req,res,next) => {
    try {
        if(req.user.role === 'admin') {

            const { id } = req.params;
            const userToDelete = await User.findById(id);

            if(!userToDelete) return res.status(401).json({message: 'User not found'});

            const blogsToDelete = await Blog.find({author: userToDelete._id});

            if(blogsToDelete.length > 0) await Blog.deleteMany({author: userToDelete._id});

            await userToDelete.deleteOne();

            return res.status(200).json({
                success: true,
                message: 'User and associated blogs deleted successfully'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized action'
            });
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Update user role  --ADMIN

export const updateRole = async(req,res,next) => {
    try {
        if(req.user.role === 'admin') {
            
            const user = await User.findById(req.params.id);

            if(!user) return res.status(401).json({message: 'User not found'});

            user.role = req.body.role;
            
            await user.save();

            res.status(200).json({
                success: true,
                message: 'User Role Updated'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized action",
            });
        }
    } catch(error) {
        handleError(res,error);
    }
};