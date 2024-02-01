import Blog from '../models/blogModel.js';
import User from "../models/userModel.js"
import ApiFeatures from '../utils/apiFeatures.js';
import { handleAuthenticationError, handleError } from '../utils/handleErrors.js';


// Get all blogs

export const getAllBlogs = async(req,res) => {
    try {

        const resultPerPage = 10;
        const blogCount = await Blog.countDocuments();

        const apiFeature = new ApiFeatures(Blog.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
        const blogs = await apiFeature.query;

        res.status(200).json({
            success: true,
            blogs,
            blogCount
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
            const user = await User.findById(req.user.id);

            req.body.author= req.user.id;
            req.body.authorName = user.username;

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

            const user = await User.findById(req.user.id);

            if(blogAuthor.equals(req.user.id) || user.role === "admin") {
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


// Like / Unlike Blog

export const likeBlog = async(req,res,next) => {
    try{
        if(req.isAuthenticated()) {
            const blog = await Blog.findById(req.params.id);

            if(!blog) return res.status(404).json({message: "Blog not found"});

            const user = await User.findById(req.user.id);

            const alreadyLiked = blog.likes.some(like => like.user.equals(req.user.id));

            if(!alreadyLiked) {
                blog.likes.push({
                    user: req.user.id,
                    username: user.username
                });

                await blog.save();

                res.status(201).json({
                    success: true,
                    message: 'Liked',
                    blog
                });
            } else {
                blog.likes = blog.likes.filter( like => !like.user.equals(req.user.id));

                await blog.save();

                res.status(201).json({
                    success: true,
                    message: 'Like Removed',
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


// Add Comment or Reply

export const addCommentOrReply = async(req,res,next) => {
    try{
        if(!req.isAuthenticated()) return handleAuthenticationError(res);

        const blog = await Blog.findById(req.params.id);

        if(!blog) return res.status(404).json({message: "Blog not found"});

        const user = await User.findById(req.user.id);

        const {text, commentId} = req.body;

        const newComment = {
            user: req.user.id,
            username: user.username,
            text
        };

        // Checking if it's a reply
        if(commentId) {
            const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);

            if(commentIndex === -1) return res.status(404).json({message: "Comment not found"});

            blog.comments[commentIndex].replies.push(newComment);
        } else {
            // It's a comment

            blog.comments.push(newComment);
        }

        await blog.save();

        return res.status(201).json({
            success: true,
            message: commentId ? "Reply added successfully" : "Comment added successfully",
            blog
        });
    } catch(error) {
        handleError(res,error);
    }
};


// Delete Comment or Reply

export const deleteCommentOrReply = async(req,res,next) => {
    try{
        if(!req.isAuthenticated) return handleAuthenticationError(res);

        const user = await User.findById(req.user.id);

        const { id, commentId } = req.params;

        const blog = await Blog.findById(id);

        if(!blog) return res.status(404).json({message: "Blog not found"});

        const { replyId } = req.body;

        // Checking if it's a reply
        if(replyId) {
            const parentComment = blog.comments.find(comment => comment._id.equals(commentId));

            if(!parentComment) return res.status(404).json({message: "Parent Comment not found"});

            const reply = parentComment.replies.find(reply => reply._id.toString() === replyId);

            if(!reply) return res.status(404).json({message: "Reply not found"});

            if(reply.user.equals(req.user.id) || user.role === "admin") {
                
                // Filter out the reply
                parentComment.replies = parentComment.replies.filter(
                    (reply) => reply._id.toString() !== replyId
                );
            } else {
                handleAuthenticationError(res);
            }
        } else {
            // It's a comment
            if(blog.comments.user.equals(req.user.id) || user.role === "admin") {
                blog.comments = blog.comments.filter(
                    (comment) => !comment._id.equals(commentId)
                );
            } else {
                handleAuthenticationError(res);
            }
        }
        await blog.save();
        
        return res.status(200).json({
            success: true,
            message: replyId ? "Reply Deleted Successfully" : "Comment Deleted Successfully",
            blog
        });
    } catch(error) {
        handleError(res,error);
    }
};


// Like / Unlike comment or reply

export const likeCommentOrReply = async(req,res,next) => {
    try{
        if(!req.isAuthenticated()) return handleAuthenticationError(res);

        const {id, commentId} = req.params;
        const { replyId } = req.body;

        const user = await User.findById(req.user.id);

        const blog = await Blog.findById(id);

        if(!blog) return res.status(404).json({message: "Blog not found"});

        const parentComment = blog.comments.find((comment) => comment._id.equals(commentId));

        if (!parentComment) return res.status(404).json({ message: "Parent comment not found" });

        // Checking if it's a reply
        if(replyId) {

            const reply = parentComment.replies.find(reply => reply._id.toString() === replyId);

            if(!reply) return res.status(404).json({message: "Reply not found"});

            const alreadyLiked = reply.likes.some(like => like.user.equals(req.user.id));

            if(!alreadyLiked) {
                reply.likes.push({
                    user: req.user.id,
                    username: user.username
                });
            } else {
                reply.likes = reply.likes.filter(like => !like.user.equals(req.user.id));
            }

            await blog.save();

            res.status(201).json({
                success: true,
                message: alreadyLiked ? "Like Removed from Reply" : "Liked Reply",
                blog
            });
        } else {
            // It's a comment

            const alreadyLiked = parentComment.likes.some(like => like.user.equals(req.user.id));

            if(!alreadyLiked) {
                parentComment.likes.push({
                    user: req.user.id,
                    username: user.username
                });
            } else {
                parentComment.likes = parentComment.likes.filter(like => !like.user.equals(req.user.id));
            }

            await blog.save();

            res.status(201).json({
                success: true,
                message: alreadyLiked ? "Like Removed from Comment" : "Comment Liked",
                blog
            });
        }
    } catch(error) {
        handleError(res,error);
    }
};


// Get All Comments of a Blog

export const getAllComments = async(req,res,next) => {
    try {
        if(!req.isAuthenticated()) return handleAuthenticationError(res);

        const blog = await Blog.findById(req.params.id);

        if(!blog) return res.status(404).json({message: "Blog not found"});

        const comments = blog.comments;

        res.status(200).json({
            success: true,
            comments
        });
    } catch(error) {
        handleError(res,error);
    }
};


// Get All Replies of a Comment

export const getAllReplies = async(req,res,next) => {
    try {
        if(!req.isAuthenticated()) return handleAuthenticationError(res);

        const { id, commentId } = req.params;

        const blog = await Blog.findById(id);

        if(!blog) return res.status(404).json({message: "Blog not found"});

        const comments = blog.comments.id(commentId);

        if(!comments) return res.status(404).json({message: "Comment not found"});

        const replies = comments.replies;

        res.status(200).json({
            success: true,
            replies
        });
    } catch(error) {
        handleError(res,error);
    }
};