import { uploadToS3 } from "../../utils/uploadToS3.js";
import { fileTypeFromBuffer } from "file-type";
import { convertImage } from "../../utils/convertImage.js";
import { File } from "../../models/index.js";
import { getSignedFileUrl } from "../../utils/getSignedUrl.js";

export const UploadImage = async (req, res) => {
    try {
        const { file } = req;
        const { to } = req.body;

        if (!file || !to) {
            return res.status(400).json({
                success: false,
                message: "Missing required contents."
            });
        }

        const detectedType = await fileTypeFromBuffer(file.buffer);
        const fromFormat =
            detectedType?.ext || file?.mimetype?.split("/")?.[1];

        if (!fromFormat) {
            return res.status(400).json({
                success: false,
                message: "Unable to determine file type."
            });
        }

        const targetFormat = to.toLowerCase();

        let convertedImage;
        try {
            convertedImage = await convertImage(
                file.buffer,
                fromFormat,
                targetFormat
            );
        } catch (err) {
            console.log("Error:", err);
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        // Upload original only after successful conversion
        const originalUpload = await uploadToS3({
            fileName: file.originalname,
            fileBuffer: file.buffer,
            mimeType: file.mimetype
        });

        if (req.user?.email) {
            await File.create({
                email: req.user.email,
                file: {
                    s3Key: originalUpload.key,
                    format: fromFormat
                }
            });
        }

        const convertedFileName = file.originalname.replace(
            /\.[^.]+$/,
            `.${targetFormat}`
        );

        const convertedUpload = await uploadToS3({
            fileName: convertedFileName,
            fileBuffer: convertedImage,
            mimeType: `image/${targetFormat}`
        });

        const signedUrl = await getSignedFileUrl(convertedUpload.key);

        return res.status(200).json({
            success: true,
            message: `File uploaded and converted successfully (${fromFormat} -> ${targetFormat})`,
            data: signedUrl,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};