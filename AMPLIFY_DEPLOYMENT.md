# AWS Amplify Deployment Guide

This guide will help you deploy the frontend to AWS Amplify.

## Prerequisites

1. AWS Account with Amplify access
2. Backend API deployed and accessible (e.g., on AWS Elastic Beanstalk, EC2, or similar)
3. Git repository (GitHub, GitLab, Bitbucket, or CodeCommit)

## Pre-Deployment Checklist

✅ **Code Review Completed:**
- All environment variables use `NEXT_PUBLIC_` prefix for client-side access
- Browser-only APIs are properly guarded with `typeof window !== 'undefined'` checks
- No hardcoded localhost URLs (all use environment variables)
- SSR compatibility verified
- `amplify.yml` configuration file created

## Required Environment Variables

You **MUST** set the following environment variable in AWS Amplify Console:

### `NEXT_PUBLIC_API_BASE`
- **Description**: The base URL for your backend API
- **Example**: `https://your-backend-api.com/api`
- **Important**: 
  - Must start with `https://` in production
  - Must include the `/api` path if your backend serves API routes under `/api`
  - Do NOT include a trailing slash

### Example Values:
```
# For production backend
NEXT_PUBLIC_API_BASE=https://api.yourdomain.com/api

# For staging backend
NEXT_PUBLIC_API_BASE=https://staging-api.yourdomain.com/api
```

## Deployment Steps

### 1. Push Code to Repository
Ensure all changes are committed and pushed to your Git repository:
```bash
git add .
git commit -m "Prepare for Amplify deployment"
git push origin main
```

### 2. Connect Repository to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select your Git provider (GitHub, GitLab, Bitbucket, or CodeCommit)
4. Authorize AWS Amplify to access your repository
5. Select your repository and branch (usually `main` or `master`)

### 3. Configure Build Settings

Amplify should auto-detect Next.js and use the `amplify.yml` file. Verify the build settings:

**Build settings** (should be auto-detected):
- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Base directory**: `frontend` (if your repo root contains both frontend and backend)

If your repository root is the frontend directory, set:
- **Base directory**: Leave empty or set to `/`

### 4. Set Environment Variables

1. In Amplify Console, go to your app
2. Navigate to **"App settings"** → **"Environment variables"**
3. Add the following variable:
   - **Key**: `NEXT_PUBLIC_API_BASE`
   - **Value**: Your backend API URL (e.g., `https://your-api.com/api`)
4. Click **"Save"**

### 5. Configure Custom Domain (Optional)

1. Go to **"Domain management"** in Amplify Console
2. Click **"Add domain"**
3. Enter your domain name
4. Follow the DNS configuration instructions

### 6. Deploy

1. Click **"Save and deploy"** or push a new commit
2. Monitor the build logs in the Amplify Console
3. Wait for the build to complete (usually 5-10 minutes)

## Build Configuration

The `amplify.yml` file is already configured with:
- Node.js dependency installation (`npm ci`)
- Next.js build command (`npm run build`)
- Proper artifact output directory (`.next`)
- Caching for faster subsequent builds

## Troubleshooting

### Build Fails with "Module not found"
- Ensure all dependencies are in `package.json`
- Check that `node_modules` is not in `.gitignore` incorrectly
- Verify Node.js version compatibility (Next.js 15 requires Node 18+)

### API Calls Fail After Deployment
- Verify `NEXT_PUBLIC_API_BASE` is set correctly in Amplify environment variables
- Check CORS settings on your backend API
- Ensure the backend API URL is accessible from the internet
- Check browser console for specific error messages

### SSR/Hydration Errors
- All browser-only APIs should be guarded with `typeof window !== 'undefined'`
- Check for any direct `window` or `document` access in components
- Verify all client components have `'use client'` directive

### Environment Variable Not Working
- Ensure variable name starts with `NEXT_PUBLIC_` for client-side access
- Rebuild the app after adding/changing environment variables
- Check that the variable is set in the correct Amplify app environment

## Post-Deployment Verification

1. ✅ Visit your Amplify app URL
2. ✅ Test user registration/login
3. ✅ Verify API calls are working (check Network tab in browser DevTools)
4. ✅ Test all major features (chat, projects, etc.)
5. ✅ Check browser console for any errors

## Security Notes

- Never commit `.env.local` files to Git
- Use Amplify environment variables for all sensitive configuration
- Ensure backend API has proper CORS configuration
- Use HTTPS for all API endpoints in production

## Support

If you encounter issues:
1. Check the build logs in Amplify Console
2. Review browser console for client-side errors
3. Verify backend API is accessible and responding
4. Check that all environment variables are set correctly

