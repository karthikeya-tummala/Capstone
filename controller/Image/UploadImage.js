import { uploadToS3 } from "../../utils/uploadToS3.js";
import { convertImage } from "../../utils/convertImage.js";
import { fileTypeFromBuffer } from "file-type";

const UploadImage = async (req, res) => {
    try {
        const { file } = req;
        const { to } = req.query;
        
        if (!file || !to) {
            return res.status(400).json({
                success: false,
                message: "Missing required contents."
            });
        }
        
        const detectedType = await fileTypeFromBuffer(file.buffer);
        const fromFormat = detectedType ? detectedType.ext : file.mimetype.split("/")[1];

        const imageUrl = await uploadToS3({
            fileName: file.originalname,
            fileBuffer: file.buffer,
            mimeType: file.mimetype
        });
        let convertedImage;
        try {
        convertedImage = await convertImage(file.buffer, fromFormat, to.toLowerCase());
        }
        catch(err) {
            console.log(err.message);
            return res.status(400).json({
                success: false,
                message: err.message
            });
            
        }

        const convertedFileName = file.originalname.replace(/\.[^.]+$/, `.${to.toLowerCase()}`);
        const convertedUrl = await uploadToS3({
            fileName: convertedFileName,
            fileBuffer: convertedImage,
            mimeType: `image/${to.toLowerCase()}`
        });

        return res.status(200).json({
      success: true,
      message: `File uploaded and converted successfully (${fromFormat} → ${to.toLowerCase()})`,
      data: {
        newUrl: convertedUrl
      }
    });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export { UploadImage }