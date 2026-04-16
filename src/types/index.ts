export interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  links: {
    github: string;
  };
}