# Auto-Sync Project System

This portfolio automatically syncs project cards with markdown files. When you add a new markdown file to `/src/pages/projects/`, it will automatically appear as a project card on both the homepage and projects page.

## How It Works

1. **Markdown Files**: Each project is a `.md` file in `/src/pages/projects/`
2. **Auto-Detection**: The system scans the projects folder and reads frontmatter from each markdown file
3. **Dynamic Cards**: Project cards are generated automatically from the markdown files
4. **GitHub Pages**: Changes are automatically deployed when you push to the main branch

## Adding New Projects

### Method 1: Using the Script (Recommended)
```bash
npm run add-project
```
This interactive script will:
- Ask for project details
- Generate the markdown file
- Set up the proper frontmatter
- Tell you what to do next

### Method 2: Manual Creation
1. Create a new `.md` file in `/src/pages/projects/` (e.g., `my-project.md`)
2. Add the required frontmatter:
   ```markdown
   ---
   layout: ../../layouts/ProjectLayout.astro
   title: "My Project"
   description: "A brief description of your project"
   technologies: ["React", "TypeScript", "Node.js"]
   featured: true
   ---
   
   # My Project
   
   Write your project content here in markdown...
   ```
3. Add a project image to `/src/assets/project/my-project.jpg`
4. Commit and push to deploy

## Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | Project title | `"My Awesome Project"` |
| `description` | ✅ | Brief description for cards | `"A web app that does X"` |
| `technologies` | ✅ | Array of tech stack | `["React", "TypeScript"]` |
| `featured` | ❌ | Show on homepage (default: false) | `true` |

## File Structure

```
src/pages/projects/
├── index.astro          # Projects listing page
├── my-project.md        # Individual project (auto-detected)
├── another-project.md   # Another project (auto-detected)
└── ...

src/assets/project/
├── my-project.jpg       # Project image (same name as .md file)
├── another-project.jpg  # Another project image
└── ...
```

## GitHub Pages Deployment

The system includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Automatically builds the site when you push to main/master
- Deploys to GitHub Pages
- Works with any changes to markdown files

## Benefits

- ✅ **Zero Configuration**: Just add a markdown file and it works
- ✅ **Automatic Deployment**: Push to GitHub and it deploys
- ✅ **Easy Content Management**: Write in markdown, no code needed
- ✅ **Consistent Design**: All projects use the same layout
- ✅ **Version Control**: All content is in Git
- ✅ **Fast Builds**: Only rebuilds when files change

## Troubleshooting

**Project not appearing?**
- Check that the `.md` file is in `/src/pages/projects/`
- Verify the frontmatter is correct (YAML syntax)
- Make sure the file doesn't have syntax errors

**Image not showing?**
- Ensure the image file exists in `/src/assets/project/`
- Image filename should match the markdown filename (e.g., `my-project.jpg` for `my-project.md`)

**Build failing?**
- Check the GitHub Actions logs
- Verify all required frontmatter fields are present
- Ensure no syntax errors in markdown files
