# UI and Styling Guidelines

Luxelle Landing Page uses a strict design philosophy to maintain a premium look and feel. 

## Tailwind CSS

All primary styling must be executed via Tailwind Utility classes.
- Avoid writing manual CSS in `.css` files unless absolutely necessary for complex animations or pseudo-element manipulations.
- Standard variables (fonts, specific brand colors) are extended in `tailwind.config.ts`.
- Reference `src/styles/globals.css` if tweaking base layer settings.

## Icons

We use **Lucide Angular** for iconography.
Whenever adding an icon, import the required module from `lucide-angular` and insert it consistently with our color and sizing utility classes.

## Components and Modularity

- Design reusable elements (buttons, cards, badges) as shared components located in `src/app/shared/`.
- Ensure components are highly responsive. Use Tailwind's standard breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`) thoughtfully. 
