import "server-only";

import sharp from "sharp";
import { getUploadCategoryConfig, isImageMime, type UploadCategory } from "@/lib/admin-upload";
import { detectImageMime, hasPdfSignature } from "@/lib/upload-signatures";

const MAX_IMAGE_DIMENSION = 10_000;
const MAX_IMAGE_PIXELS = 40_000_000;

type PreparedUpload = {
  body: Buffer;
  contentType: string;
  extension: string;
};

function extensionForMime(mime: string) {
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  if (mime === "application/pdf") return ".pdf";
  throw new Error("Unsupported upload type.");
}

async function normalizeImage(buffer: Buffer, mime: string) {
  const decoder = sharp(buffer, { failOn: "warning", limitInputPixels: MAX_IMAGE_PIXELS });
  const metadata = await decoder.metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  if (!width || !height || width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION || width * height > MAX_IMAGE_PIXELS) {
    throw new Error("Image dimensions are not allowed.");
  }

  const pipeline = decoder.rotate();
  if (mime === "image/jpeg") return pipeline.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  if (mime === "image/png") return pipeline.png({ compressionLevel: 9 }).toBuffer();
  return pipeline.webp({ quality: 88 }).toBuffer();
}

export async function prepareUpload(category: UploadCategory, file: File): Promise<PreparedUpload> {
  const config = getUploadCategoryConfig(category);
  const maxBytes = config.allowedTypes[file.type];
  if (!maxBytes || file.size <= 0 || file.size > maxBytes) throw new Error("Upload validation failed.");

  const raw = Buffer.from(await file.arrayBuffer());
  if (raw.length !== file.size || raw.length > maxBytes) throw new Error("Upload validation failed.");

  if (isImageMime(file.type)) {
    const detectedMime = detectImageMime(raw);
    if (!detectedMime || detectedMime !== file.type) throw new Error("Upload content does not match its declared type.");
    const body = await normalizeImage(raw, detectedMime);
    return { body, contentType: detectedMime, extension: extensionForMime(detectedMime) };
  }

  if (file.type === "application/pdf" && (category === "cv" || category === "certificates")) {
    if (!hasPdfSignature(raw)) throw new Error("Upload content is not a valid PDF.");
    return { body: raw, contentType: "application/pdf", extension: ".pdf" };
  }

  throw new Error("Upload type is not allowed.");
}
