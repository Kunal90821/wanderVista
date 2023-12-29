import express from "express";
import { register, login, logOut, forgotPassword, resetPassword, getUserDetail, getAllUsers, getSingleUser, updateProfile, updatePassword, deleteUser, updateRole } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logOut);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").put(resetPassword);

router.route("/me").get(getUserDetail);

router.route("/me/profile").put(updateProfile);

router.route("/me/update-password").put(updatePassword);

router.route("/admin/users").get(getAllUsers);

router.route("/admin/user/:id").get(getSingleUser).put(updateRole).delete(deleteUser);

export default router;