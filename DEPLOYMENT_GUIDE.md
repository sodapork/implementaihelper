# Deployment Guide - AI Implementation Helper

This guide will help you deploy the AI Implementation Helper tool to GitHub Pages so it can be embedded via iframe.

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Repository**: The code should be in a GitHub repository at `https://github.com/sodapork/implementaihelper.git`
3. **Node.js**: Version 16 or higher installed locally

## Step 1: Prepare Your Repository

1. **Fork or Clone**: If you haven't already, fork the repository or clone it to your local machine
2. **Push to GitHub**: Ensure all your changes are pushed to the GitHub repository

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/sodapork/implementaihelper`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (or click **Pages** in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch (this will be created automatically)
6. Click **Save**

## Step 3: Deploy the Application

### Option A: Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that will automatically deploy when you push to the main branch.

1. **Push your changes** to the main branch:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Monitor the deployment**:
   - Go to your repository on GitHub
   - Click on **Actions** tab
   - You should see a workflow running called "Deploy to GitHub Pages"
   - Wait for it to complete (usually takes 2-3 minutes)

### Option B: Manual Deployment

If you prefer to deploy manually:

1. **Install dependencies and build**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Or use the deployment script**:
   ```bash
   ./deploy.sh
   ```

## Step 4: Verify Deployment

1. **Wait a few minutes** for GitHub Pages to build and deploy
2. **Visit your site**: `https://sodapork.github.io/implementaihelper`
3. **Test the application** to ensure everything works correctly

## Step 5: Embed via iframe

Once deployed, you can embed the tool on any website using an iframe:

### Basic Embed
```html
<iframe 
  src="https://sodapork.github.io/implementaihelper" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
  title="AI Implementation Helper"
></iframe>
```

### Responsive Embed
```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 100%;">
  <iframe 
    src="https://sodapork.github.io/implementaihelper" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
    title="AI Implementation Helper"
  ></iframe>
</div>
```

## Troubleshooting

### Common Issues

1. **404 Error**: 
   - Make sure GitHub Pages is enabled
   - Check that the gh-pages branch exists
   - Wait a few minutes for the first deployment

2. **Build Failures**:
   - Check the Actions tab for error messages
   - Ensure all dependencies are properly installed
   - Verify the build works locally with `npm run build`

3. **Styling Issues**:
   - Clear your browser cache
   - Check that the base URL in `vite.config.ts` matches your repository name

### Updating the Deployment

To update the deployed version:

1. **Make your changes** to the code
2. **Commit and push** to the main branch:
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. **Wait for automatic deployment** (2-3 minutes)
4. **Test the updated version** at your GitHub Pages URL

## Custom Domain (Optional)

If you want to use a custom domain:

1. **Add a CNAME file** to the `public` directory with your domain
2. **Configure DNS** to point to `sodapork.github.io`
3. **Update GitHub Pages settings** to use your custom domain
4. **Update the iframe src** to use your custom domain

## Support

If you encounter any issues:

1. Check the GitHub Actions logs for error messages
2. Verify all files are properly committed and pushed
3. Ensure GitHub Pages is enabled and configured correctly
4. Test the build locally before deploying

---

**Note**: The first deployment may take up to 10 minutes to become available. Subsequent deployments are usually faster. 