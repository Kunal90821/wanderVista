import express from "express";
import { composeBlog, deleteBlog, getAllBlogs, getSingleBlog, modify } from "../controllers/blogController.js";

const router = express.Router();

router.route("/blogs").get(getAllBlogs);

router.route("/blog/:id").get(getSingleBlog).put(modify).delete(deleteBlog);;

router.route('/compose').post(composeBlog);

export default router;