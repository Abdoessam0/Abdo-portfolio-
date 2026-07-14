export type AdminSession = {
  userId: number;
  username: string;
  email: string;
  sessionVersion: number;
  exp: number;
  iat: number;
};

export type AdminUserRecord = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  display_name: string | null;
  active: number;
  session_version: number;
};

export type AdminProject = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  category: string;
  tech_stack: string;
  thumbnail_url: string;
  live_url: string;
  github_url: string;
  featured: boolean;
  published: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  alt_text: string;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminSkill = {
  id: number;
  name: string;
  category: string;
  level_label: string;
  visible: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminExperience = {
  id: number;
  company: string;
  role: string;
  location: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  stack: string;
  visible: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminEducation = {
  id: number;
  school: string;
  degree: string;
  location: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  visible: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminCertificate = {
  id: number;
  title: string;
  issuer: string;
  certificate_date: string | null;
  certificate_url: string;
  visible: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminProfileSettings = {
  id: number;
  name: string;
  headline: string;
  bio: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  cv_url: string;
  whatsapp_url: string;
  instagram_url: string;
  footer_text: string;
  twitter_url: string;
  created_at: string | null;
  updated_at: string | null;
};

export type DashboardOverview = {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  featuredProjects: number;
  totalSkills: number;
  totalExperience: number;
  totalEducation: number;
  totalCertificates: number;
  hiddenSkills: number;
  hiddenExperience: number;
  profileComplete: boolean;
  profileName: string;
  profileHeadline: string;
  profileEmail: string;
  profileCvUrl: string;
  lastUpdatedContent: string | null;
};
