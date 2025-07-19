export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  createdAt?: Date;
}
