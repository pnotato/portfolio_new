# Dynamic Projects System

This portfolio uses a dynamic project system that automatically generates project cards and pages. Here's how it works:

## Adding New Projects

### 1. Add Project Data
Edit `/src/data/projects.ts` and add your new project to the `projects` array:

```typescript
{
  id: "my-new-project",
  title: "My New Project",
  description: "A brief description of your project.",
  image: "/src/assets/project/my-project.jpg",
  link: "/projects/my-new-project",
  technologies: ["React", "TypeScript", "Node.js"],
  featured: true // Set to true to show on homepage
}
```

### 2. Add Project Image
Place your project image in `/src/assets/project/` with the filename you specified in the data.

### 3. Create Project Page (Optional)
Create a new file at `/src/pages/projects/my-new-project.astro` for a detailed project page. You can copy the structure from existing project pages.

## How It Works

- **Homepage**: Shows only featured projects (`featured: true`)
- **Projects Page**: Shows all projects in a grid layout
- **Individual Pages**: Each project can have its own detailed page
- **Automatic Updates**: Adding a project to the data file automatically makes it appear on both the homepage and projects page

## Project Data Structure

```typescript
interface Project {
  id: string;           // Unique identifier
  title: string;        // Display name
  description: string;  // Brief description
  image: string;        // Path to project image
  link: string;         // URL to project page
  technologies: string[]; // Tech stack tags
  featured?: boolean;   // Show on homepage (optional)
}
```

## Benefits

- ✅ No need to manually update multiple files
- ✅ Consistent design across all projects
- ✅ Easy to maintain and scale
- ✅ Type-safe with TypeScript
- ✅ Responsive design built-in
