import express from "express";
import { UploadImage } from "../controller/Image/index.js";
import { upload } from "../middleware/multer.js";

const imageRouter = express.Router();

imageRouter.post('/upload', upload.single("file") ,UploadImage);

export { imageRouter };