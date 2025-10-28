import { uploadToS3 } from "../../utils/uploadToS3.js";

const UploadImage = async (req, res) => {
    try {
        const { file } = req;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const imageUrl = await uploadToS3({
            fileName: file.originalname,
            fileBuffer: file.buffer,
            mimeType: file.mimetype
        });

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: imageUrl
        })

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { UploadImage }