/**
 * Generates a new Markdown or MDX file for a blog post with the specified component name.
 *
 * @param {string} componentType - The type of the blog post (md or mdx).
 * @param {string} componentName - The name of blog post to be generated.
 *
 * @usage
 * ```
 * npm run generate:md postName
 * npm run generate:mdx postName
 * ```
 */

const fs = require('fs');
const path = require('path');

const postType = process.argv[2];
const postName = process.argv[3].replace(/-/g, ' ');

    // first replacing spaces with dashes, then removing symbols not allowed in file names
const sanitizedPostName = postName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');

if (!postType || !postName) {
  console.error('Usage: npm run generate:[md/mdx] [componentName]');
  process.exit(1);
}

const contentFolderPath = path.join(__dirname, '..', 'src', 'content', 'blog');
const filePath = path.join(contentFolderPath, `${sanitizedPostName}.${postType}`);

if (fs.existsSync(filePath)) {
  console.error(`File ${filePath} already exists.`);
  process.exit(1);
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

const example_md = `
# ${postName}

*example text*

## Headings

**example text**

### Subheadings

1. example
2. list

> quote

![My GitHub avatar](https://avatars.githubusercontent.com/u/82332291?v=4)
[My website](https://hukasx0.github.io/)
`

const example_mdx = `
import Button from "@components/ui/button.astro";

# ${postName}

## <a name="Paragraphs"></a>Paragraphs

example text
**example text**

## <a name="Blockquotes"></a>Blockquotes

> quote

### Unordered List

- example text
  - example text
- example text

<div>
  <Button>Click Me</Button>
</div>
`

const exampleContent = `---
draft: false
title: "${postName}"
snippet: "Enter your snippet here"
image: {
    src: "https://your-image-url.com",
    alt: "Your Image Alt Text"
}
publishDate: "${formattedDate}"
category: "Uncategorized"
author: "Hubert Kasperek"
tags: ['example', 'tags']
---

${postType === 'mdx' ? example_mdx : example_md}
`;

fs.writeFileSync(filePath, exampleContent);

console.log(`Generated ${postType} file: ${filePath}`);
