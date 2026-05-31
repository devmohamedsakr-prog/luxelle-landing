# Netlify Deployment Guide

## Overview

This guide covers deploying the Luxelle Landing Page to Netlify with proper configuration for Angular 18 and dependency management.

## Prerequisites

- GitHub repository connected to Netlify
- Node.js v22.14.0 (configured automatically via `.nvmrc`)
- npm with legacy peer deps support (configured via `.npmrc`)

## Configuration Files

### netlify.toml

The `netlify.toml` file contains all build configuration:

```toml
[build]
  command = "npm run build:prod"
  publish = "dist/luxelle-landing-page/browser"

[build.environment]
  NODE_VERSION = "22.14.0"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### .npmrc

The `.npmrc` file ensures dependencies install correctly:

```
legacy-peer-deps=true
```

This is required because `lucide-angular@0.263.0` has peer dependency conflicts with Angular 18.

## Deployment Steps

### Automatic Deployment

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Netlify will automatically detect the configuration

2. **Push Changes**
   ```bash
   git push origin main
   ```

3. **Automatic Build**
   - Netlify will automatically trigger a build
   - Build uses Node.js v22.14.0
   - Dependencies install with `--legacy-peer-deps`
   - Production build runs via `npm run build:prod`

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build:prod

# Deploy
netlify deploy --prod --dir=dist/luxelle-landing-page/browser
```

## Build Configuration

### Build Command
```bash
npm run build:prod
```

This runs Angular's production build with optimizations.

### Publish Directory
```
dist/luxelle-landing-page/browser
```

This is where Angular outputs the compiled application.

### Environment Variables

- **NODE_VERSION**: `22.14.0` - Required for Angular 18
- **NPM_FLAGS**: `--legacy-peer-deps` - Resolves lucide-angular conflicts

## Troubleshooting

### Dependency Resolution Errors

**Issue**: `ERESOLVE could not resolve` errors during npm install

**Solution**: The `.npmrc` file with `legacy-peer-deps=true` resolves this automatically.

### Build Failures

**Issue**: Build fails with Node.js version errors

**Solution**: Ensure `.nvmrc` contains `22.14.0` and `netlify.toml` has `NODE_VERSION = "22.14.0"`

### 404 on Page Refresh

**Issue**: Angular routes return 404 when refreshing

**Solution**: The redirect rule in `netlify.toml` handles SPA routing automatically.

## Performance Optimization

### Build Budgets

The project has strict build budgets configured:

- **Initial Bundle**: Max 1MB (warning at 500KB)
- **Component Styles**: Max 4KB (warning at 2KB)

### Optimization Features

- Output hashing for cache busting
- Tree shaking for smaller bundles
- Minification and compression
- Lazy loading for routes

## Monitoring

After deployment, monitor:

- Build logs in Netlify dashboard
- Bundle size warnings
- Performance metrics
- Error tracking

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [Project README](../README.md)
