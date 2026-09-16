export type BlogCategory = 'learning' | 'travel' | 'experience';

export interface BlogPostMeta {
  // For learning posts
  certName?: string;
  certIssuer?: string;
  certLevel?: string;
  // For travel posts
  location?: string;
  country?: string;
  // For experience posts
  experienceType?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string; // HTML string
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  date: string; // YYYY-MM-DD
  readTime: number; // minutes
  featured: boolean;
  keyTakeaways?: string[];
  personalNote?: string;
  metadata: BlogPostMeta;
}
