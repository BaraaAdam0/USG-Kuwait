export interface ProjectImage {
  url: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  category: "Villas" | "Commercial" | "Mosques" | string;
  location: string;
  year: string;
  area?: string;
  scope?: string;
  owner?: string;
  coverImage: string;
  images: ProjectImage[];
}
