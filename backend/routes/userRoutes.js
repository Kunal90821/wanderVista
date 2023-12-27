import express from "express";
import { register, login, logOut, forgotPassword, resetPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logOut);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

export default router;