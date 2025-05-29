# GitHub Pages Deployment Instructions for Zephyr Website

This guide will walk you through the process of deploying your Zephyr sales enablement website to GitHub Pages, a free hosting service provided by GitHub.

## Prerequisites

1. A GitHub account (free) - [Sign up here](https://github.com/join) if you don't have one
2. Basic familiarity with GitHub (or follow these step-by-step instructions)

## Step 1: Create a New GitHub Repository

1. Log in to your GitHub account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "zephyr-website")
4. Make sure the repository is set to "Public" (required for free GitHub Pages)
5. Check the box "Add a README file"
6. Click "Create repository"

## Step 2: Upload the Website Files

### Option A: Using GitHub Web Interface (Easiest)

1. In your new repository, click the "Add file" button and select "Upload files"
2. Drag and drop all the files from the `github_pages_export` folder (including the `index.html` file and the `images` folder)
3. Add a commit message like "Initial website upload"
4. Click "Commit changes"

### Option B: Using Git Command Line (For Advanced Users)

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/YOUR-USERNAME/zephyr-website.git
   ```
2. Copy all files from the `github_pages_export` folder to the cloned repository folder
3. Add, commit, and push the files:
   ```
   git add .
   git commit -m "Initial website upload"
   git push origin main
   ```

## Step 3: Enable GitHub Pages

1. In your repository, click on "Settings" (tab at the top)
2. Scroll down to the "GitHub Pages" section (or click "Pages" in the left sidebar)
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait a few minutes for GitHub to build and deploy your site

## Step 4: Access Your Website

1. After GitHub Pages is enabled, you'll see a message saying "Your site is published at https://YOUR-USERNAME.github.io/zephyr-website/"
2. Click on this link to view your live website
3. Bookmark this URL - this is your permanent website address

## Step 5: Set Up a Custom Domain (Optional)

If you want to use a custom domain (e.g., zephyr.yourdomain.com):

1. In your repository's "Settings" > "Pages"
2. Under "Custom domain", enter your domain name
3. Click "Save"
4. Follow the DNS configuration instructions provided by GitHub

## Updating Your Website

Whenever you want to update your website:

1. Edit the files in your repository (either directly on GitHub or by pushing changes from your local machine)
2. GitHub will automatically rebuild and deploy your site with the changes

## Troubleshooting

- **Images not displaying**: Make sure all image paths in the HTML file are correct (they should be relative paths like `images/slide_5_image_2.png`)
- **Page not found**: It may take a few minutes for GitHub to build and deploy your site. If the issue persists, check that GitHub Pages is properly enabled
- **Custom domain not working**: DNS changes can take up to 48 hours to propagate

## Form Handling

The contact form on the website needs a backend service to process submissions. You have several options:

1. **Formspree**: Update the form action in index.html to use your Formspree endpoint
   ```html
   <form action="https://formspree.io/f/YOUR-FORMSPREE-ID" method="POST">
   ```
   Sign up at [Formspree](https://formspree.io/) to get your form endpoint

2. **Google Forms**: Create a Google Form and update the form action
3. **Netlify Forms**: If you later decide to move to Netlify hosting, they offer built-in form handling

## Need Help?

If you encounter any issues with your GitHub Pages deployment, feel free to reach out for assistance.
