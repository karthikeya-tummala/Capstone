import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./S3ClientHandler.js";

export const getSignedFileUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5 // 5 minutes
  });
};