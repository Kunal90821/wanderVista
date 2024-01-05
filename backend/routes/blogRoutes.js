import express from "express";
import { addCommentOrReply, composeBlog, deleteBlog, deleteCommentOrReply, getAllBlogs, getSingleBlog, likeBlog, likeCommentOrReply, modify } from "../controllers/blogController.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs).post(composeBlog);

router.route("/blogs/:id").get(getSingleBlog).post(likeBlog).put(modify).delete(deleteBlog);;

router.route("/blogs/:id/comment").post(addCommentOrReply)

router.route("/blogs/:id/comments/:commentId").post(likeCommentOrReply).delete(deleteCommentOrReply);

export default router;