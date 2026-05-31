# Architecture and Codebase Structure

Luxelle Landing Page is built using a modern, scalable web stack focusing on performance and visual fidelity.

## Technology Stack

- **Framework**: Angular v18
- **Styling**: Tailwind CSS v3 with PostCSS and custom globals.
- **Icons**: Lucide Angular
- **Alerts/Toasts**: ngx-toastr
- **Testing**: Karma & Jasmine
- **CI/CD**: GitHub Actions

## Directory Structure

```text
src/
├── app/
│   ├── core/         # Core singletons, services, models, and interceptors
│   ├── features/     # Feature modules/components (e.g., gallery, services, pricing)
│   ├── layout/       # Global layout components (e.g., navbar, footer)
│   └── shared/       # Reusable UI components, pipes, directives
├── assets/           # Static assets, fonts, brand imagery
├── environments/     # Environment specific variables (dev vs prod)
└── styles/           # Global stylesheets and Tailwind directives
```

## State Management
Given the nature of a landing page, state management is largely handled via Angular components and RxJS data streams from core services.
