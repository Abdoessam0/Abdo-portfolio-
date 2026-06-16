import { z } from "zod";

const emptyToNull = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value === null || value === undefined) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  });

const textValue = (max = 10000) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (value ?? "").toString().trim())
    .pipe(z.string().max(max));

export function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 255);
}

export function parsePositiveId(value: string | number) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id.");
  }

  return id;
}

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Username or email is required.").max(255),
  password: z.string().min(1, "Password is required.").max(512),
});

export const projectSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required.").max(255),
    slug: textValue(255),
    short_description: z.string().trim().min(1, "Short description is required.").max(10000),
    long_description: textValue(50000),
    category: textValue(120),
    tech_stack: textValue(10000),
    thumbnail_url: textValue(2000),
    live_url: textValue(2000),
    github_url: textValue(2000),
    featured: z.coerce.boolean().default(false),
    published: z.coerce.boolean().default(false),
    order_index: z.coerce.number().int().default(0),
  })
  .transform((value) => ({
    ...value,
    slug: sanitizeSlug(value.slug || value.title),
  }))
  .refine((value) => value.slug.length > 0, {
    path: ["slug"],
    message: "Slug is required.",
  });

export const projectPatchSchema = z.object({
  featured: z.coerce.boolean().optional(),
  published: z.coerce.boolean().optional(),
  order_index: z.coerce.number().int().optional(),
});

export const projectImageSchema = z.object({
  image_url: z.string().trim().min(1, "Image URL is required.").max(2000),
  alt_text: textValue(255),
  order_index: z.coerce.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required.").max(160),
  category: z.string().trim().min(1, "Category is required.").max(80),
  level_label: textValue(80),
  visible: z.coerce.boolean().default(true),
  order_index: z.coerce.number().int().default(0),
});

export const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required.").max(180),
  role: z.string().trim().min(1, "Role is required.").max(180),
  location: textValue(180),
  start_date: emptyToNull,
  end_date: emptyToNull,
  description: textValue(50000),
  stack: textValue(10000),
  visible: z.coerce.boolean().default(true),
  order_index: z.coerce.number().int().default(0),
});

export const educationSchema = z.object({
  school: z.string().trim().min(1, "School is required.").max(180),
  degree: z.string().trim().min(1, "Degree is required.").max(180),
  location: textValue(180),
  start_date: emptyToNull,
  end_date: emptyToNull,
  description: textValue(50000),
  visible: z.coerce.boolean().default(true),
  order_index: z.coerce.number().int().default(0),
});

export const certificateSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(220),
  issuer: textValue(180),
  certificate_date: emptyToNull,
  certificate_url: textValue(2000),
  visible: z.coerce.boolean().default(true),
  order_index: z.coerce.number().int().default(0),
});

export const profileSettingsSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(180),
  headline: z.string().trim().min(1, "Headline is required.").max(255),
  bio: textValue(50000),
  email: z.string().trim().email("A valid email is required.").max(255),
  github_url: textValue(2000),
  linkedin_url: textValue(2000),
  cv_url: textValue(2000),
});

export function formatZodError(error: z.ZodError) {
  return error.issues.map((issue) => issue.message).join(" ");
}
