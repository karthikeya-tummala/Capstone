import express from "express";
const router = express.Router();
import { imageRouter } from "./ImageRoutes.js";
import { authRouter } from "./AuthRoutes.js";

router.use("/upload", imageRouter);
router.use("/auth", authRouter);

export { router as routes };