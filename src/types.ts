export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  externalUrl: string;
  client?: string;
  year?: string;
  results?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  activities: string[];
  deliverable: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
