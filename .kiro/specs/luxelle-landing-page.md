# Luxelle Landing Page - Complete Project Specification

**Project Name:** Luxelle  
**Type:** Premium Beauty & Wellness Center Landing Page  
**Framework:** Angular 21/22 with Standalone Components & Signals  
**Styling:** Tailwind CSS + Custom CSS  
**Status:** In Development

---

## 1. Project Overview

Luxelle is a high-end beauty and wellness center landing page showcasing luxury skincare treatments, hair styling, makeup services, spa experiences, lashes, nails, and facial treatments. The design emphasizes sophistication, elegance, and a premium spa aesthetic with a dark-mode-first approach.

### Brand Identity
- **Aesthetic:** Luxurious, elegant, feminine, modern spa/beauty
- **Mood:** Sophisticated, calm, premium, relaxing
- **Target Audience:** High-end clientele seeking luxury beauty services

---

## 2. Design System

### Color Palette

#### Dark Mode (Default)
- **Background:** Deep Elegant `#0F0F0F`
- **Cards & Sections:** Soft Dark `#1F1F1F` with glassmorphism
- **Primary Accent:** Soft Rose Gold `#E8B4BC`
- **Secondary Accent:** Warm Gold `#D4AF37`
- **Highlight:** Blush Pink `#F8C1D4`
- **Text Primary:** `#FFFFFF`
- **Text Secondary:** `#F5F0EB`
- **Text Tertiary:** `#CCCCCC`

#### Light Mode
- **Background:** Soft Cream/Beige `#FAF8F3`
- **Cards & Sections:** Off-White `#FFFFFF` with subtle shadows
- **Primary Accent:** Rose Gold `#E8B4BC` (darker shade)
- **Secondary Accent:** Gold `#D4AF37` (darker shade)
- **Highlight:** Blush Pink `#F8C1D4`
- **Text Primary:** `#1F1F1F`
- **Text Secondary:** `#4A4A4A`
- **Text Tertiary:** `#888888`

### Typography
- **Headings:** Elegant serif or modern sans-serif (e.g., Playfair Display, Poppins)
- **Body:** Clean sans-serif (e.g., Inter, Poppins)
- **Font Sizes:**
  - H1: 48px (Hero)
  - H2: 36px (Section titles)
  - H3: 24px (Card titles)
  - Body: 16px
  - Small: 14px

### Spacing & Layout
- **Container Max Width:** 1280px
- **Padding:** 16px (mobile), 24px (tablet), 32px (desktop)
- **Gap:** 16px (mobile), 24px (desktop)
- **Border Radius:** 12px (cards), 8px (buttons)

---

## 3. Technical Stack

### Core Dependencies
```
- Angular 21/22
- TypeScript 5.x
- Tailwind CSS 3.x
- PostCSS
- Autoprefixer
- ts-particles (ngx-particles)
- lucide-angular
- ngx-toastr
- @angular/animations
```

### Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   │   └── app.config.ts
│   │   ├── constants/
│   │   │   └── app.constants.ts
│   │   ├── models/
│   │   │   ├── booking.model.ts
│   │   │   ├── service.model.ts
│   │   │   └── theme.model.ts
│   │   └── services/
│   │       ├── booking.service.ts
│   │       ├── notification.service.ts
│   │       └── theme.service.ts
│   │
│   ├── shared/
│   │   ├── animations/
│   │   │   └── animations.ts
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   └── input/
│   │   │   └── common/
│   │   │       ├── navbar/
│   │   │       └── footer/
│   │   ├── directives/
│   │   │   └── scroll-reveal.directive.ts
│   │   └── particles/
│   │       └── particles-config.ts
│   │
│   ├── features/
│   │   ├── hero/
│   │   │   └── hero.component.ts
│   │   ├── about/
│   │   │   └── about.component.ts
│   │   ├── services/
│   │   │   └── services.component.ts
│   │   ├── pricing/
│   │   │   └── pricing.component.ts
│   │   ├── gallery/
│   │   │   └── gallery.component.ts
│   │   └── booking/
│   │       └── booking.component.ts
│   │
│   ├── layout/
│   │   └── main-layout/
│   │       └── main-layout.component.ts
│   │
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets/
│   └── images/
│
├── styles/
│   ├── globals.css
│   └── tailwind.css
│
├── tailwind.config.ts
├── postcss.config.js
├── main.ts
└── index.html
```

---

## 4. Page Sections (In Order)

### 4.1 Navbar
**Component:** `navbar.component.ts`

**Features:**
- Logo "Luxelle" (left-aligned)
- Navigation links: Home, About, Services, Pricing, Gallery, Contact
- Theme toggle button (Sun/Moon icon)
- "Book Appointment" CTA button (primary accent color)
- Responsive hamburger menu (mobile)
- Blur backdrop effect on scroll
- Smooth transitions between light/dark themes

**Styling:**
- Fixed/sticky positioning
- Glassmorphism effect with backdrop blur
- Smooth shadow on scroll
- Responsive: Full nav (desktop), hamburger (mobile)

---

### 4.2 Hero Section
**Component:** `hero.component.ts`

**Content:**
- **Headline:** "Luxelle – Where Beauty Meets Elegance"
- **Subtitle:** "Experience luxury skincare, wellness, and beauty treatments in a sophisticated atmosphere"
- **CTA Button:** "Book Your Experience" (primary accent)
- **Background:** Full-screen with subtle gradient
- **Particles:** Soft glowing rose gold + warm gold particles (ts-particles)

**Features:**
- Full viewport height
- Centered content with elegant typography
- Subtle particle animation (gentle, luxurious feel)
- Smooth fade-in animation on load
- Responsive text sizing
- Optional: Background image with overlay

**Animations:**
- Fade-in + slight slide-up on page load
- Particles: Gentle floating motion
- Button: Soft shimmer + scale on hover

---

### 4.3 About Luxelle
**Component:** `about.component.ts`

**Content:**
- **Title:** "About Luxelle"
- **Description:** 2-3 paragraphs about the brand, values, and commitment to luxury
- **Key Points:** Elegance, expertise, premium experience, personalized service
- **Optional:** Team photos or brand imagery

**Features:**
- Section reveal animation (fade-in + slide-up)
- Elegant typography with proper spacing
- Responsive layout (text + image side-by-side on desktop, stacked on mobile)
- Subtle background gradient or pattern

---

### 4.4 Our Services
**Component:** `services.component.ts`

**Content:**
- **Title:** "Our Services"
- **Service Cards:** Grid of 6-8 services with icons
  - Skincare Treatments
  - Hair Styling
  - Makeup Services
  - Spa Experiences
  - Lashes
  - Nails
  - Facial Treatments
  - Wellness Consultations

**Features:**
- Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Card hover effects: Lift + rose gold glow
- Icons from lucide-angular
- Smooth transitions
- Section reveal animation

**Card Design:**
- Icon at top
- Service name
- Brief description
- Subtle background with glassmorphism
- Hover: Lift effect + glow

---

### 4.5 Pricing
**Component:** `pricing.component.ts`

**Content:**
- **Title:** "Pricing"
- **Pricing Tiers:** 3-4 tiers (e.g., Essential, Premium, Luxury, VIP)
- **Features per tier:** Service inclusions, duration, price
- **CTA:** "Book Now" button per tier

**Features:**
- Responsive grid (1 col mobile, 2-3 cols desktop)
- Highlight "Most Popular" tier
- Smooth hover animations
- Price display with currency
- Feature list with checkmarks
- Section reveal animation

**Pricing Tiers Example:**
1. **Essential** - Basic treatments
2. **Premium** - Popular combination packages
3. **Luxury** - Full spa experience (highlighted)
4. **VIP** - Exclusive personalized service

---

### 4.6 Gallery
**Component:** `gallery.component.ts`

**Content:**
- **Title:** "Gallery"
- **Images:** 8-12 high-quality images of spa, treatments, facilities
- **Layout:** Masonry or grid layout

**Features:**
- Responsive masonry grid
- Image hover effects: Zoom + overlay
- Smooth fade-in animations
- Optional: Lightbox/modal for full-size view
- Lazy loading for performance

---

### 4.7 Booking Form
**Component:** `booking.component.ts`

**Content:**
- **Title:** "Book Your Appointment"
- **Form Fields:**
  - Full Name (text input)
  - Phone Number (tel input)
  - Email (email input)
  - Preferred Date (date picker)
  - Preferred Time (time picker)
  - Service Type (dropdown/select)
  - Additional Notes (textarea)
  - Terms & Conditions checkbox
  - Submit button

**Features:**
- Form validation (client-side)
- Success/error notifications (ngx-toastr)
- Loading state on submit
- Responsive layout (single column mobile, 2 columns desktop)
- Smooth form animations
- Clear error messages
- Success message after submission

**Validation Rules:**
- Name: Required, min 2 characters
- Phone: Required, valid format
- Email: Required, valid email
- Date: Required, future date only
- Time: Required
- Service: Required
- Terms: Must be checked

---

### 4.8 Footer
**Component:** `footer.component.ts`

**Content:**
- **Logo:** "Luxelle"
- **Links:** About, Services, Pricing, Gallery, Contact
- **Contact Info:** Phone, Email, Address
- **Social Links:** Instagram, Facebook, LinkedIn
- **Copyright:** Year + company name
- **Newsletter Signup:** Optional email subscription

**Features:**
- Responsive layout (stacked mobile, multi-column desktop)
- Elegant typography
- Subtle background
- Social media icons
- Quick links
- Contact information

---

## 5. Animations & Effects

### Global Animations
- **Section Reveal:** Fade-in + 20px slide-up (0.6s ease-out)
- **Card Hover:** Lift 8px + rose gold glow (0.3s ease-out)
- **Button Hover:** Scale 1.05 + shimmer effect (0.3s ease-out)
- **Theme Toggle:** Smooth color transition (0.3s ease-in-out)

### Particles (Hero Section Only)
- **Type:** Soft glowing particles
- **Colors:** Rose Gold (#E8B4BC) + Warm Gold (#D4AF37)
- **Behavior:** Gentle floating, subtle opacity changes
- **Density:** Low (10-20 particles)
- **Speed:** Very slow, luxurious feel
- **Size:** 2-4px

### Scroll Effects
- **Navbar:** Blur backdrop + shadow on scroll
- **Parallax:** Optional subtle parallax on hero background
- **Scroll Reveal:** Staggered fade-in for section elements

---

## 6. Theme Toggle Implementation

### Features
- **Toggle Button:** Sun/Moon icon in navbar
- **Storage:** LocalStorage for persistence
- **Default:** Dark mode
- **Transition:** Smooth 0.3s color transition
- **Scope:** Entire application

### Implementation Details
- Use Angular Signals for theme state management
- Apply theme class to `<html>` or `<body>` element
- Tailwind dark mode support via class strategy
- CSS variables for dynamic color switching

---

## 7. Responsive Design

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-First Approach
- Start with mobile layout
- Enhance for tablet and desktop
- Touch-friendly buttons (min 44px)
- Readable font sizes on all devices
- Optimized images for mobile

---

## 8. Performance Considerations

- **Image Optimization:** WebP format, lazy loading
- **Code Splitting:** Lazy-loaded feature modules
- **Bundle Size:** Tree-shaking, minimal dependencies
- **Animations:** GPU-accelerated (transform, opacity)
- **Particles:** Optimized for performance, disable on low-end devices

---

## 9. Accessibility

- **WCAG 2.1 AA Compliance** (where applicable)
- **Semantic HTML:** Proper heading hierarchy, landmarks
- **Color Contrast:** Sufficient contrast ratios
- **Keyboard Navigation:** All interactive elements accessible
- **ARIA Labels:** For icons and interactive components
- **Focus States:** Visible focus indicators
- **Alt Text:** Descriptive alt text for images

---

## 10. Implementation Tasks

### Phase 1: Setup & Configuration
- [ ] Configure Tailwind CSS with custom colors
- [ ] Setup PostCSS and Autoprefixer
- [ ] Create centralized globals.css with utilities
- [ ] Configure tailwind.config.ts with theme colors
- [ ] Setup Angular animations
- [ ] Configure ngx-particles

### Phase 2: Core Components
- [ ] Create UI components (Button, Card, Input)
- [ ] Create Navbar component with theme toggle
- [ ] Create Footer component
- [ ] Setup main layout component
- [ ] Create scroll-reveal directive

### Phase 3: Feature Components
- [ ] Hero section with particles
- [ ] About section
- [ ] Services section with grid
- [ ] Pricing section with tiers
- [ ] Gallery section with masonry
- [ ] Booking form with validation

### Phase 4: Services & Logic
- [ ] Theme service with Signal state
- [ ] Booking service with validation
- [ ] Notification service integration
- [ ] Form submission logic
- [ ] LocalStorage persistence

### Phase 5: Polish & Optimization
- [ ] Animation refinement
- [ ] Responsive testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing

### Phase 6: Deployment
- [ ] Build optimization
- [ ] SEO setup
- [ ] Analytics integration
- [ ] Deployment configuration

---

## 11. Key Features Checklist

### Design System
- [x] Color palette defined (dark + light modes)
- [x] Typography system
- [x] Spacing & layout guidelines
- [x] Component design patterns

### Functionality
- [ ] Theme toggle (light/dark)
- [ ] Responsive navigation
- [ ] Booking form with validation
- [ ] Smooth animations
- [ ] Particle effects
- [ ] Scroll reveal animations
- [ ] Form notifications

### Technical
- [ ] Standalone components
- [ ] Signals for state management
- [ ] Tailwind CSS styling
- [ ] Angular animations
- [ ] ts-particles integration
- [ ] Responsive design
- [ ] Performance optimized

---

## 12. Success Criteria

1. **Visual Excellence:** Luxurious, elegant, premium appearance
2. **Performance:** Fast load times, smooth animations
3. **Responsiveness:** Perfect on mobile, tablet, desktop
4. **Functionality:** All features working as specified
5. **Accessibility:** WCAG 2.1 AA compliant
6. **User Experience:** Intuitive, smooth, delightful interactions
7. **Code Quality:** Clean, maintainable, well-documented

---

## 13. Next Steps

1. Review and approve this specification
2. Begin Phase 1: Setup & Configuration
3. Create tailwind.config.ts with custom colors
4. Setup globals.css with utilities
5. Create UI component library
6. Implement feature components
7. Test and refine

---

**Document Version:** 1.0  
**Last Updated:** April 8, 2026  
**Status:** Ready for Implementation
