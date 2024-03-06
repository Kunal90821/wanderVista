import passport from "passport";
import User from "../models/userModel.js";
import { randomBytes } from 'crypto';
import { sendEmail } from "../utils/sendEmail.js";
import { handleAuthenticationError, handleError } from "../utils/handleErrors.js";
import Blog from "../models/blogModel.js";
import cloudinary from 'cloudinary';


// Register User

export const register = async(req,res,next) => {

    try {
        const { username, name, email, password, avatar } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'wanderVista/avatars',
            width: 150,
            crop: 'scale'
        },
        function(error, result) {
            console.log(result,error);
        }
        );


        const newUser = { 
            username, 
            name, 
            email, 
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        };

        const user = await User.findOne({username}) || await User.findOne({email});

        if(user) return res.status(400).json({
            message: 'User already exists. Please try different username'
        });

        User.register(newUser, password, function(err,user) {
            if(err) {
                if (err.name === "ValidationError") {
                    const validationErrors = Object.values(err.errors).map(
                        (error) => error.message
                    );
                    return res.status(400).json({ errors: validationErrors });
                } else {
                    return res.status(500).json({ error: err.message });
                }
            } else {
                passport.authenticate("local")(req,res, ()=> {
                    res.status(201).json({
                        success: true,
                        user
                    });
                });
            }
        });
    } catch(error) {
      // Handle Cloudinary upload error
        return res.status(500).json({
            error: "Error uploading avatar to Cloudinary",
        });
    }
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
        if(req.isAuthenticated()) {
            const user = await User.findById(req.user.id);

            return res.status(200).json({
                success: true,
                user
            });
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res, error);
    }
};


// Update user profile

export const updateProfile = async (req,res,next) => {
    try {
        if(req.isAuthenticated()) {
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

        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Update User Password

export const updatePassword = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
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
        } else {
            handleAuthenticationError(res);
        }
    } catch (error) {
        handleError(res, error);
    }
};


// Get all users -- ADMIN

export const getAllUsers = async (req,res,next) => {
    
    try {
        if(req.isAuthenticated()) {
        const user = await User.findById(req.user.id);

            if(user.role === "admin") {
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
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Get Single User  -- ADMIN

export const getSingleUser = async (req,res,next) => {
    
    try {
        const { id } = req.params;

        if(req.isAuthenticated() && req.user.role === 'admin') {
            const user = await User.findById(id);
            res.status(200).json({
                success: true,
                user
            });
        } else {
            handleAuthenticatedUser(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Delete User & deleting their blogs --ADMIN

export const deleteUser = async (req,res,next) => {
    try {
        if(req.isAuthenticated()) {
            const authenticatedUser = await User.findById(req.user.id);

            if(authenticatedUser.role === 'admin') {
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
                    message: 'User is not authorized to perform this function'
                });
            }
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Update user role  --ADMIN

export const updateRole = async(req,res,next) => {
    try {
        if(req.isAuthenticated() && req.user.role === 'admin') {
            
            const user = await User.findById(req.params.id);

            if(!user) return res.status(401).json({message: 'User not found'});

            user.role = req.body.role;
            
            await user.save();

            res.status(200).json({
                success: true,
                message: 'User Role Updated'
            });
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};