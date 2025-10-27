import express from "express";
const router = express.Router();
import { imageRouter } from "./ImageRoutes.js";

router.use("/", imageRouter);

export { router as routes };