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
            fileName: file.originalName,
            fileBuffer: file.buffer,
            mimeType: file.mimeType
        });

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: imageUrl
        })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}

export { UploadImage }