import express from "express";
import { getAllCategories, createCategory, deleteCategory, updateCategory } from '../controllers/categoryController.js';
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(authorizeRoles("admin"), createCategory);  // Admin only

router.route("/:id").put(authorizeRoles("admin"),updateCategory).delete(authorizeRoles("admin"),deleteCategory);    // Admin only

export default router;