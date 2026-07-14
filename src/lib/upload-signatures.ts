export type AllowedImageMime = "image/jpeg" | "image/png" | "image/webp";

export function detectImageMime(buffer: Uint8Array): AllowedImageMime | null {
  if (buffer.length >= 12 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (
    buffer.length >= 8 &&
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => buffer[index] === value)
  ) return "image/png";
  if (
    buffer.length >= 12 &&
    String.fromCharCode(...buffer.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...buffer.slice(8, 12)) === "WEBP"
  ) return "image/webp";
  return null;
}

export function hasPdfSignature(buffer: Uint8Array) {
  return buffer.length >= 8 && String.fromCharCode(...buffer.slice(0, 5)) === "%PDF-";
}

