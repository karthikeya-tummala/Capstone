import express from "express";
const router = express.Router();
import { imageRouter } from "./ImageRoutes";

router.use("/", imageRouter);

export { router };