import sharp from "sharp";
import { formats } from "./Constants.js";

function isConversionAllowed(from, to) {
  const rule = formats.find(f => f.from === from);
  return rule ? rule.to.includes(to) : false;
}

const normalizeFormat = (fmt) => {
  if (!fmt) return null;

  let lower = fmt.toLowerCase();

  if (lower === "jpg") return "jpeg";
  if (lower === "tif") return "tiff";

  if (lower.startsWith("x-")) {
    lower = lower.replace("x-", "");
  }

  if (lower.includes("+")) {
    lower = lower.split("+")[0];  // "svg+xml" → "svg"
  }

  return lower;
};


export async function convertImage(inputBuffer, fromFormat, toFormat, options = {}) {

  const from = normalizeFormat(fromFormat);
  const to = normalizeFormat(toFormat);

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
      case "jpeg":
        return await img.jpeg({
          quality: config.quality,
          progressive: true,
          chromaSubsampling: "4:4:4"
        }).toBuffer();

      case "png":
        return await img.png({
          compressionLevel: 9,
          progressive: true
        }).toBuffer();

      case "webp":
        return await img.webp({
          quality: config.quality
        }).toBuffer();

      case "avif":
        return await img.avif({
          quality: config.quality
        }).toBuffer();

      case "tiff":
        return await img.tiff({
          quality: config.quality,
          compression: "lzw"
        }).toBuffer();

      default:
        throw new Error(`Unsupported target format: ${to}`);
    }
  } catch (err) {
    console.error("Image conversion failed:", err);
    throw new Error(`Failed to convert ${fromFormat} → ${toFormat}, ${err}`);
  }
}
