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


// Add Comment

export const addComment = async(req,res,next) => {
    try {
        if(req.isAuthenticated()) {
            const {id} = req.params;

            const blog = await Blog.findById(id);

            if(!blog) return res.status(404).json({message: 'Blog not found'});

            const user = await User.findById(req.user.id);

            const newComment = {
                user: req.user.id,
                username: user.username,
                text: req.body.text
            };

            blog.comments.push(newComment);

            await blog.save();

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


//  Update a comment

export const updateComment = async(req,res,next) => {
    try{
        if(req.isAuthenticated()) {
            const blog = await Blog.findById(req.params.id);

            if(!blog) return res.status(404).json({message: "Blog not found"});

            const comment = blog.comments.find(comment => comment._id.toString() === req.body.commentId);

            if(!comment) return res.status(404).json({message: "Comment not found"});
            
            if(comment.user.equals(req.user.id)) {

                comment.text = req.body.text;
                
                await blog.save();

                return res.status(200).json({
                    success: true,
                    blog
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


// Delete a comment

export const deleteComment = async (req,res,next) => {
    try {
        if(req.isAuthenticated()){
            const blog = await Blog.findById(req.params.id);

            if(!blog) return res.status(404).json({message : "Blog not found"});

            const removed = removeCommentAndReplies(blog.comments, req.body.commentId);

            if(removed) {
                await blog.save();
                return res.status(200).json({
                    success: true,
                    message: "Comment and associated replies deleted successfully",
                    blog
                });
            } else {
                return res.status(404).json({message: "Comment not found"});
            }
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};

// Removing comment and its replies

const removeCommentAndReplies = (comments, commentId) => {
    for(let i=0; i < comments.length;i++) {
        if(comments[i]._id.toString() === commentId) {
            comments.splice(i,1);
            return true;  // comment found and removed
        }
        if(comments[i].replies && removeCommentAndReplies(comments[i].replies,commentId)) {
            return true;  // Comment found and removed in replies
        }
    }
    return false; // comment not found
};

// Like Blog

export const likeBlog = async(req,res,next) => {
    try{
        if(req.isAuthenticated()) {
            const blog = await Blog.findById(req.params.id);

            if(!blog) return res.status(404).json({message: "Blog not found"});

            const user = await User.findById(req.user.id);

            const alreadyLiked = blog.likes.some(like => like.user.equals(req.user.id));

            if(!alreadyLiked) {
                blog.likesCount += 1;
                blog.likes.push({
                    user: req.user.id,
                    username: user.username
                });

                await blog.save();

                res.status(201).json({
                    success: true,
                    blog
                });
            }
        } else {
            handleAuthenticationError(res);
        }
    } catch(error) {
        handleError(res,error);
    }
};