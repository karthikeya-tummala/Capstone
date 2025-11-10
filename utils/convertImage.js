import sharp from "sharp";
import { formats } from "./Constants.js";

function isConversionAllowed(from, to) {
  const rule = formats.find(f => f.from === from.toLowerCase());
  return rule ? rule.to.includes(to.toLowerCase()) : false;
}

export async function convertImage(inputBuffer, fromFormat, toFormat, options = {}) {

  const from = fromFormat.toLowerCase();
  const to = toFormat.toLowerCase();

  if (!isConversionAllowed(from, to)) {
    throw new Error(`Conversion from ${from} to ${to} not allowed.`);
  }

  try {
    const img = sharp(inputBuffer);

    const config = {
      quality: 95,
      progressive: true,
      chromaSubsampling: "4:4:4",
      ...options
    };

    switch (to) {
      case "jpeg": return await img.jpeg(config).toBuffer();
      case "png":  return await img.png({ compressionLevel: 9 }).toBuffer();
      case "webp": return await img.webp(config).toBuffer();
      case "avif": return await img.avif({ quality: config.quality }).toBuffer();
      case "heif": return await img.heif({ quality: config.quality }).toBuffer();
      case "tiff": return await img.tiff({ quality: config.quality }).toBuffer();
      default:
        throw new Error(`Unsupported target format: ${to}`);
    }
  } catch (err) {
    console.error("Image conversion failed:", err);
    throw new Error(`Failed to convert ${fromFormat} → ${toFormat}`);
  }
}
