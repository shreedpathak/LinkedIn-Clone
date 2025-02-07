import express from 'express';  
const router = express.Router();
import authController from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.post("/logout", authController.logOut);

router.get("/me", protectRoute, authController.currentUser);

export default router;
