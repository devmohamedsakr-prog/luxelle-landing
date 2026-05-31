# Luxelle Landing Page - Installation Guide

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+

## Installation Steps

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is needed because lucide-angular@0.263.0 has peer dependency requirements for Angular 13-16, but we're using Angular 18. This is safe and the package works fine with Angular 18.

### 2. Verify Installation
```bash
npm list @angular/core lucide-angular ngx-toastr
```

### 3. Start Development Server
```bash
npm start
```

The application will be available at `http://localhost:4200`

### 4. Build for Production
```bash
npm run build:prod
```

## Required Dependencies

### Core Angular Packages
- `@angular/animations` - Animation support
- `@angular/common` - Common utilities
- `@angular/compiler` - Template compilation
- `@angular/core` - Core framework
- `@angular/forms` - Form handling (Reactive Forms)
- `@angular/platform-browser` - Browser platform
- `@angular/platform-browser-dynamic` - Dynamic platform
- `@angular/router` - Routing

### UI & Styling
- `lucide-angular` - Icon library
- `ngx-toastr` - Toast notifications
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - PostCSS plugin for vendor prefixes
- `postcss` - CSS transformation tool

### State Management & Utilities
- `rxjs` - Reactive programming library
- `tslib` - TypeScript runtime library
- `zone.js` - Zone management for Angular

### Development Tools
- `@angular/cli` - Angular command-line interface
- `@angular/compiler-cli` - Compiler for AOT builds
- `@angular-devkit/build-angular` - Build tools
- `typescript` - TypeScript compiler
- `karma` - Test runner
- `jasmine-core` - Testing framework
- `fast-check` - Property-based testing

## Troubleshooting

### Peer Dependency Warnings
If you see warnings about peer dependencies, use `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### Module Not Found Errors
If you get "Cannot find module" errors:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install --legacy-peer-deps` again

### Port Already in Use
If port 4200 is already in use:
```bash
npm start -- --port 4300
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   ├── models/
│   │   └── services/
│   ├── features/
│   │   ├── about/
│   │   ├── booking/
│   │   ├── gallery/
│   │   ├── hero/
│   │   ├── pricing/
│   │   └── services/
│   ├── layout/
│   │   ├── footer/
│   │   └── navbar/
│   ├── shared/
│   │   ├── animations/
│   │   ├── components/
│   │   ├── directives/
│   │   └── particles/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── styles/
│   ├── globals.css
│   └── tailwind.css
├── index.html
└── main.ts
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run watch` - Watch mode for development
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Run linter

## Notes

- All components are standalone Angular components
- State management uses Angular Signals
- Styling uses Tailwind CSS with custom configuration
- Forms use Angular Reactive Forms
- Icons from lucide-angular
- Notifications via ngx-toastr
