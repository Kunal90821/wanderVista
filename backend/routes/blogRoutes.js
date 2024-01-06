import express from "express";
import { addCommentOrReply, composeBlog, deleteBlog, deleteCommentOrReply, getAllBlogs, getAllComments, getAllReplies, getSingleBlog, likeBlog, likeCommentOrReply, modify } from "../controllers/blogController.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs).post(composeBlog);

router.route("/blogs/:id").get(getSingleBlog).post(likeBlog).put(modify).delete(deleteBlog);

router.route("/blogs/:id/comments").get(getAllComments).post(addCommentOrReply)

router.route("/blogs/:id/comments/:commentId").get(getAllReplies).post(likeCommentOrReply).delete(deleteCommentOrReply);

export default router;