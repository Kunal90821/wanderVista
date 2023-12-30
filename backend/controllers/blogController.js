import Blog from '../models/blogModel.js';
import User from "../models/userModel.js"
import { handleAuthenticationError, handleError } from '../utils/handleErrors.js';


// Get all blogs

export const getAllBlogs = async(req,res,next) => {
    try {
        const blogs = await Blog.find();

        res.status(200).json({
            success: true,
            blogs
        });
    } catch(error) {
        handleError(res,error);
    }
};


// Get Single Blog

export const getSingleBlog = async(req,res,next) => {
    try{
        const blog = await Blog.findById(req.params.id);

        if(!blog) return res.status(401).json({message: 'Blog not found'});

        res.status(200).json({
            success: true,
            blog
        });
    } catch(error) {
        handleError(res,error);
    }
};


// Create a blog

export const composeBlog = async(req,res,next) => {
    try {
        if(req.isAuthenticated()) {
            const user = await User.findById()
            req.body.author= req.user.id;

            const blog = await Blog.create(req.body);

            res.status(201).json({
                success: true,
                blog
            });
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Modify Blog

export const modify = async(req,res,next) => {
    try {
        if(req.isAuthenticated()) {

            const blogId = req.params.id;

            let blog = await Blog.findById(blogId);

            if(!blog) return res.status(404).json({message: 'Blog not found'});

            const blogAuthor = blog.author;

            if(blogAuthor.equals(req.user.id)) {
        
                const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
                    new: true,
                    runValidators: true
                });
                res.status(200).json({
                    success: true,
                    updatedBlog
                });
            } else {
                handleAuthenticationError(res);
            }
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Delete Blog

export const deleteBlog = async (req,res,next) => {
    try {
        if(req.isAuthenticated()) {
            const blog = await Blog.findById(req.params.id);

            if(!blog) return res.status(404).json({message: "Blog not found"});

            const blogAuthor = blog.author;

            if(blogAuthor.equals(req.user.id)) {
                await blog.deleteOne();

                res.status(200).json({
                    success: true,
                    message: "Blog deleted successfully"
                });
            } else {
                handleAuthenticationError(res);
            }
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(req,error);
    }
};