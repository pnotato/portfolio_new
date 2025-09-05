#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addProject() {
  console.log('🚀 Adding a new project...\n');
  
  const title = await question('Project title: ');
  const description = await question('Project description: ');
  const technologies = await question('Technologies (comma-separated): ');
  const featured = await question('Featured project? (y/n): ');
  const tags = await question('Tags (comma-separated, options: Web & Full Stack, Systems Programming, Data Analysis, Hackathon, Personal): ');
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const featuredBool = featured.toLowerCase() === 'y' || featured.toLowerCase() === 'yes';
  const techArray = technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
  const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  
  const markdownContent = `---
layout: ../../layouts/ProjectLayout.astro
title: "${title}"
description: "${description}"
technologies: [${techArray.map(tech => `"${tech}"`).join(', ')}]
tags: [${tagArray.map(tag => `"${tag}"`).join(', ')}]
featured: ${featuredBool}
---

# ${title}

${description}

## About This Project

Write your project details here...

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

${techArray.join(', ')}

## Impact

Describe the impact and results of your project...
`;

  const filePath = path.join(__dirname, '..', 'src', 'pages', 'projects', `${slug}.md`);
  
  try {
    fs.writeFileSync(filePath, markdownContent);
    console.log(`\n✅ Project created successfully!`);
    console.log(`📁 File: ${filePath}`);
    console.log(`🌐 URL: /projects/${slug}`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Add a project image to /src/assets/project/${slug}.jpg`);
    console.log(`2. Edit the markdown file to add your project content`);
    console.log(`3. Commit and push to deploy automatically!`);
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
  }
  
  rl.close();
}

addProject().catch(console.error);
