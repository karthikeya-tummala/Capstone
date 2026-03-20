import express from "express";
import { imageRouter } from "./ImageRoutes.js";
import { authRouter } from "./AuthRoutes.js";

const router = express.Router();

router.use("/upload", imageRouter);
router.use("/auth", authRouter);

export { router as routes };