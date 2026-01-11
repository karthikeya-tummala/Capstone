import express from "express";
import { UploadImage } from "../controller/Image/index.js";
import { upload, authenticate } from "../middleware/index.js";

const imageRouter = express.Router();

imageRouter.post('/', upload.single("file"), authenticate, UploadImage);

export { imageRouter };