import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  tags: string[];
  featured?: boolean;
}

async function getMarkdownFiles(): Promise<Project[]> {
  try {
    const projectsDir = join(process.cwd(), 'src/pages/projects');
    const files = await readdir(projectsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md') && file !== 'index.md');
    
    const projects: Project[] = [];
    
    for (const file of markdownFiles) {
      const filePath = join(projectsDir, file);
      const fileContent = await readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      const projectId = file.replace('.md', '');
      
      projects.push({
        id: projectId,
        title: data.title || 'Untitled Project',
        description: data.description || 'No description available.',
        image: `/src/assets/project/${projectId}.jpg`,
        link: `/projects/${projectId}`,
        technologies: data.technologies || [],
        tags: data.tags || ['Personal'],
        featured: data.featured || false
      });
    }
    
    return projects;
  } catch (error) {
    console.error('Error reading markdown files:', error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getMarkdownFiles();
  return projects.filter(project => project.featured);
}

export async function getAllProjects(): Promise<Project[]> {
  return await getMarkdownFiles();
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getMarkdownFiles();
  return projects.find(project => project.id === id);
}

export async function getAllTags(): Promise<string[]> {
  const projects = await getMarkdownFiles();
  const allTags = projects.flatMap(project => project.tags);
  return [...new Set(allTags)].sort();
}

export async function getProjectsByTag(tag: string): Promise<Project[]> {
  const projects = await getMarkdownFiles();
  return projects.filter(project => project.tags.includes(tag));
}
