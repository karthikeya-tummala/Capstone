const formats = [
  { from: "jpeg", to: ["png", "webp", "avif", "tiff"] },
  { from: "png",  to: ["jpeg", "webp", "avif", "tiff"] },
  { from: "webp", to: ["jpeg", "png", "avif", "tiff"] },
  { from: "avif", to: ["jpeg", "png", "webp", "tiff"] },
  { from: "tiff", to: ["jpeg", "png", "webp", "avif",] },
  { from: "svg",  to: ["jpeg", "png", "webp", "avif", "tiff"] },
  { from: "bmp",  to: ["jpeg", "png", "webp", "avif", "tiff"] },
  { from: "gif",  to: ["jpeg", "png", "webp", "avif", "tiff"] },
];

export { formats };
