import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import Blog from "../models/blogModel.js"
import { handleAuthenticationError, handleError } from '../utils/handleErrors.js';


// Get all categories

export const getAllCategories = async (req,res,next) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        handleError(res,error);
    }
};


// Create a new category

export const createCategory = async (req,res,next) => {
    try {
        if(req.isAuthenticated()) {
            const { name } = req.body;

            let category = await Category.findOne({ name });

            if (category) {
                return res.status(400).json({
                    message: "Category already exists",
                });
            }

            category = await category.create({ name });

            res.status(201).json({
                success: true,
                category,
            });
        } else {
            handleAuthenticationError(res);
        }

    } catch(error) {
        handleError(res,error);
    }
};


// Update a category

export const updateCategory = async (req,res,next) => {
    try {
        if(req.isAuthenticated()) {
            const user = await User.findById(req.user.id);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    message: "Only admins can update categories",
                });
            }

            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "Category name is required",
                });
            }

            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    message: "Category not found",
                });
            }

            category.name = name;

            await category.save();

            res.status(200).json({
                success: true,
                message: "Category updated successfully",
                category,
            });
        } else {
            handleAuthenticationError(res);
        }

    } catch(error) {
        handleError(res,error);
    }
};


// Delete a category and its associated blogs

export const deleteCategory = async (req,res,next) => {
    try{
        if(req.isAuthenticated()) {
            const user = await User.findById(req.user.id);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    message: "Only admins can delete categories",
                });
            }

            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    message: "Category not found",
                });
            }

            // Delete all associated blogs

            await Blog.deleteMany({ category: category._id });

            // Delete category

            await category.deleteOne();

            res.status(200).json({
                success: true,
                message: "Category and associated blogs deleted",
            });
        } else {
            handleAuthenticationError(res);
        }

    } catch (error) {
        handleError(res,error);
    }
};