import multer from "multer";

const storage = multer.memoryStorage();
const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024;       // 5 MB Size

const upload = multer({
    storage,
    limits: {
        fileSize: IMAGE_SIZE_LIMIT
    },
    fileFilter: (req, file, cb) => {
        if (file.size > IMAGE_SIZE_LIMIT) {
            cb(new Error('File Size should be less than 5 MB'));
        }
    }
});

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occured during file upload"
        })
    }
    next();
}


export { upload }