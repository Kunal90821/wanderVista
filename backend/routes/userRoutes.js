import express from "express";
import { register, login, logOut, forgotPassword, resetPassword, getUserDetail, getAllUsers, getSingleUser, updateProfile, updatePassword, deleteUser, updateRole } from "../controllers/userController.js";
import { isAuthenticated } from "../config/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logOut);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetail);

router.route("/me/profile").put(isAuthenticated, updateProfile);

router.route("/me/update-password").put(isAuthenticated, updatePassword);

router.route("/admin/users").get(isAuthenticated, getAllUsers);

router.route("/admin/user/:id").get(isAuthenticated, getSingleUser).delete(isAuthenticated, deleteUser).put(isAuthenticated, updateRole);

export default router;