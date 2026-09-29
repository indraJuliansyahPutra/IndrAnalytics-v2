export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  category: "professional" | "personal";
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  bio: string;
  cvPath: string;
  profileImage: string;
  contact: ContactInfo;
  social: SocialLink[];
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  score?: string;
  certificateUrl?: string;
  icon: "graduation" | "course" | "lab" | "organization";
  highlights: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  images: ProjectImage[];
  link: string;
  visible: boolean;
}

export interface Certificate {
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
  image: string;
  verifyUrl: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface VideoEmbed {
  title: string;
  youtubeId: string;
}
