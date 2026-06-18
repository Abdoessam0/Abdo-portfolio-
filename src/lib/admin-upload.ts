export type UploadCategory = "projects" | "cv" | "certificates";

type UploadCategoryConfig = {
  directory: string;
  accept: string;
  helperText: string;
  defaultBaseName: string;
  allowedTypes: Record<string, number>;
  extensionsByType: Record<string, string[]>;
};

const MB = 1024 * 1024;

export const uploadCategoryConfigs: Record<UploadCategory, UploadCategoryConfig> = {
  projects: {
    directory: "projects",
    accept: "image/jpeg,image/png,image/webp",
    helperText: "JPG, PNG, WebP - max 5 MB",
    defaultBaseName: "project-image",
    allowedTypes: {
      "image/jpeg": 5 * MB,
      "image/png": 5 * MB,
      "image/webp": 5 * MB,
    },
    extensionsByType: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  },
  cv: {
    directory: "cv",
    accept: "application/pdf",
    helperText: "PDF only - max 10 MB",
    defaultBaseName: "abdelrahman-mohamed-cv",
    allowedTypes: {
      "application/pdf": 10 * MB,
    },
    extensionsByType: {
      "application/pdf": [".pdf"],
    },
  },
  certificates: {
    directory: "certificates",
    accept: "application/pdf,image/jpeg,image/png,image/webp",
    helperText: "PDF up to 10 MB, JPG/PNG/WebP up to 5 MB",
    defaultBaseName: "certificate",
    allowedTypes: {
      "application/pdf": 10 * MB,
      "image/jpeg": 5 * MB,
      "image/png": 5 * MB,
      "image/webp": 5 * MB,
    },
    extensionsByType: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  },
};

export function isUploadCategory(value: unknown): value is UploadCategory {
  return typeof value === "string" && value in uploadCategoryConfigs;
}

export function getUploadCategoryConfig(category: UploadCategory) {
  return uploadCategoryConfigs[category];
}

export function validateUploadFile(
  category: UploadCategory,
  file: { type: string; size: number },
) {
  const config = getUploadCategoryConfig(category);
  const maxBytes = config.allowedTypes[file.type];

  if (!maxBytes) {
    return `Invalid file type. Allowed files: ${config.helperText}.`;
  }

  if (file.size > maxBytes) {
    return `File is too large. ${config.helperText}.`;
  }

  return null;
}

export function isImageMime(type: string) {
  return type === "image/jpeg" || type === "image/png" || type === "image/webp";
}

export function isPdfMime(type: string) {
  return type === "application/pdf";
}
