import express from "express";
import { addComment, composeBlog, deleteBlog, deleteComment, getAllBlogs, getSingleBlog, likeBlog, modify, updateComment } from "../controllers/blogController.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs);

router.route("/blog/:id").get(getSingleBlog).put(modify).delete(deleteBlog);;

router.route('/compose').post(composeBlog);

router.route("/blog/:id/comment").post(addComment).put(updateComment).delete(deleteComment);

router.route("/blog/:id/like").post(likeBlog);

export default router;