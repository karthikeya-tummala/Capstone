import { S3Client } from "./S3ClientHandler.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async ({ fileName, fileBuffer, mimeType }) => {

  const bucket = process.env.S3_BUCKET_NAME;
  const folderName = "uploads/";
  const key = `${folderName}${fileName}`;

  await S3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    })
  );

  return `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;
};

