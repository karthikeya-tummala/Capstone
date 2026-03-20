import { File } from "../../models/index.js";
import { getSignedFileUrl } from "../../utils/getSignedUrl.js";

export const GetUploads = async (req, res) => {
  try {
    if (!req.user?.email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Need to be logged in first."
      });
    }
    
    const userFiles = await File.find({
      email: req.user.email
    }).sort({ createdAt: -1 });
    
    if (!userFiles.length) {
      return res.status(404).json({
        success: false,
        message: "No images found for this user."
      });
    }

    const urls = await Promise.all(
      userFiles.map(async (doc) => {
        const url = await getSignedFileUrl(doc.file.s3Key);
        return url;
      })
    );

    return res.status(200).json({
      success: true,
      count: urls.length,
      data: urls
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
