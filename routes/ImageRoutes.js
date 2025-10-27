import express from "express";
import { UploadImage } from "../controller/Image/index";
import { upload } from "../middleware/multer";

const imageRouter = express.Router();

imageRouter.post('/upload', upload.single('file'), UploadImage);

export { imageRouter };