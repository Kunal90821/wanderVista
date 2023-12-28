import express from "express";
import { register, login, logOut, forgotPassword, resetPassword, getUserDetail, getAllUsers, getSingleUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logOut);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.get("/me", getUserDetail);

router.get("/admin/users",getAllUsers);

router.get("/admin/user/:id", getSingleUser);

export default router;