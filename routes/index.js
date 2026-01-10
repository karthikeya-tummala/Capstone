import express from "express";
const router = express.Router();
import { imageRouter } from "./ImageRoutes.js";
import { authRouter } from "./AuthRoutes.js";

router.use("/", imageRouter);
router.use("/auth", authRouter);

export { router as routes };