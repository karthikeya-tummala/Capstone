const formats = [
  { from: "jpeg", to: ["png", "webp", "avif", "heif", "tiff"] },
  { from: "png",  to: ["jpeg", "webp", "avif", "heif", "tiff"] },
  { from: "webp", to: ["jpeg", "png", "avif", "heif", "tiff"] },
  { from: "avif", to: ["jpeg", "png", "webp", "heif", "tiff"] },
  { from: "heif", to: ["jpeg", "png", "webp", "avif", "tiff"] },
  { from: "tiff", to: ["jpeg", "png", "webp", "avif", "heif"] },
  { from: "bmp",  to: ["jpeg", "png", "webp", "avif", "heif", "tiff"] },
  { from: "gif",  to: ["jpeg", "png", "webp", "avif", "heif", "tiff"] },
  { from: "svg",  to: ["jpeg", "png", "webp", "avif", "heif", "tiff"] }
];


export { formats };