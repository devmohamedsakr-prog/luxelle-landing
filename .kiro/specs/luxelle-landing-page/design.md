# Luxelle Landing Page - Design Document

## Overview

The Luxelle landing page is a premium beauty and wellness center digital storefront built with Angular 21/22 using Standalone Components and Signals. The design emphasizes luxury, elegance, and sophistication through a dark-mode-first approach with rose gold and warm gold accents, glassmorphism effects, and smooth animations.

### Design Philosophy

- **Luxury First**: Every visual element communicates premium positioning
- **Dark Mode Default**: Eye-friendly, sophisticated aesthetic with rose gold accents
- **Responsive Excellence**: Seamless experience across mobile, tablet, and desktop
- **Performance Optimized**: Fast load times and smooth 60fps animations
- **Accessibility Focused**: WCAG 2.1 AA compliance with keyboard navigation and color contrast

### Key Design Principles

1. **Minimalist Elegance**: Clean layouts with strategic use of whitespace
2. **Glassmorphism**: Semi-transparent cards with blur effects for depth
3. **Micro-interactions**: Subtle hover effects and scroll-triggered animations
4. **Consistent Spacing**: 8px base unit for all margins and padding
5. **Typography Hierarchy**: Clear visual distinction between content levels

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Luxelle Landing Page                      │
│                   (Angular 21/22 App)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼────────┐   │      ┌──────▼──────────┐
        │  Core Services │   │      │  Shared Module  │
        ├────────────────┤   │      ├─────────────────┤
        │ • Theme        │   │      │ • UI Components │
        │ • Booking      │   │      │ • Animations    │
        │ • Notification │   │      │ • Directives    │
        │ • Constants    │   │      │ • Particles     │
        └────────────────┘   │      └─────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │         Feature Components              │
        ├─────────────────────────────────────────┤
        │ • Navbar      • Services   • Gallery    │
        │ • Hero        • Pricing    • Booking    │
        │ • About       • Footer                  │
        └─────────────────────────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │      External Dependencies              │
        ├─────────────────────────────────────────┤
        │ • ts-particles (ngx-particles)          │
        │ • lucide-angular (icons)                │
        │ • ngx-toastr (notifications)            │
        │ • Angular Animations                    │
        │ • Tailwind CSS                          │
        └─────────────────────────────────────────┘
```

### Component Hierarchy

```
AppComponent (Root)
├── Navbar (Standalone)
│   ├── Logo
│   ├── NavLinks
│   ├── ThemeToggle
│   └── HamburgerMenu (Mobile)
├── Hero (Standalone)
│   ├── Particles Container
│   ├── Headline
│   ├── Subtitle
│   └── CTA Button
├── About (Standalone)
│   ├── Title
│   ├── Content
│   └── Image
├── Services (Standalone)
│   └── ServiceCard[] (Standalone)
│       ├── Icon
│       ├── Title
│       └── Description
├── Pricing (Standalone)
│   └── PricingCard[] (Standalone)
│       ├── Tier Name
│       ├── Price
│       ├── Features List
│       └── CTA Button
├── Gallery (Standalone)
│   ├── GalleryImage[] (Standalone)
│   └── Lightbox Modal (Standalone)
├── Booking (Standalone)
│   ├── Form
│   │   ├── Input[] (Standalone)
│   │   ├── Select (Standalone)
│   │   ├── Textarea (Standalone)
│   │   └── Checkbox (Standalone)
│   └── SubmitButton
├── Footer (Standalone)
│   ├── Logo
│   ├── NavLinks
│   ├── ContactInfo
│   └── SocialLinks
└── Notifications (ngx-toastr)
```

---

## Components and Interfaces

### Core Component Specifications

#### 1. Navbar Component
- **Standalone**: Yes
- **Inputs**: None (uses services)
- **Outputs**: Navigation events
- **State**: Mobile menu open/close, scroll position
- **Responsibilities**:
  - Display logo and navigation links
  - Theme toggle functionality
  - Mobile hamburger menu
  - Scroll-triggered blur effect
  - Smooth scroll to sections

#### 2. Hero Component
- **Standalone**: Yes
- **Inputs**: None
- **Outputs**: CTA click events
- **State**: Particle animation state
- **Responsibilities**:
  - Full-viewport hero section
  - Headline and subtitle display
  - Particle animation initialization
  - CTA button with hover effects
  - Fade-in and slide-up animation on load

#### 3. Services Component
- **Standalone**: Yes
- **Inputs**: None
- **Outputs**: Service selection events
- **State**: Hover states for cards
- **Responsibilities**:
  - Display 8 service cards in responsive grid
  - Service icons from lucide-angular
  - Hover lift and glow effects
  - Staggered fade-in animations
  - Responsive layout (1/2/3 columns)

#### 4. Pricing Component
- **Standalone**: Yes
- **Inputs**: None
- **Outputs**: Booking events
- **State**: Hover states for cards
- **Responsibilities**:
  - Display 4 pricing tiers
  - Highlight "Most Popular" tier
  - Hover lift and glow effects
  - Staggered animations
  - Responsive layout

#### 5. Gallery Component
- **Standalone**: Yes
- **Inputs**: None
- **Outputs**: Image selection events
- **State**: Lightbox open/close, selected image
- **Responsibilities**:
  - Display 8-12 images in masonry/grid
  - Lazy loading implementation
  - Hover zoom effects
  - Lightbox modal functionality
  - Responsive layout (1/2/3-4 columns)

#### 6. Booking Component
- **Standalone**: Yes
- **Inputs**: None
- **Outputs**: Form submission events
- **State**: Form data, validation errors, loading state
- **Responsibilities**:
  - Form field management
  - Real-time validation
  - Error message display
  - Form submission handling
  - Success/error notifications
  - Responsive layout (1/2 columns)

#### 7. Footer Component
- **Standalone**: Yes
- **Inputs**: None
- **Outputs**: Navigation events
- **State**: None
- **Responsibilities**:
  - Display footer content
  - Navigation links
  - Contact information
  - Social media links
  - Responsive layout

### UI Component Library

#### Button Component
```typescript
interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
```

#### Card Component
```typescript
interface CardProps {
  title?: string;
  description?: string;
  icon?: string;
  glassmorphism?: boolean;
  hoverable?: boolean;
}
```

#### Input Component
```typescript
interface InputProps {
  type: 'text' | 'email' | 'tel' | 'date' | 'time';
  placeholder?: string;
  value?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}
```

#### Select Component
```typescript
interface SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}
```

#### Textarea Component
```typescript
interface TextareaProps {
  placeholder?: string;
  value?: string;
  rows?: number;
  onChange?: (value: string) => void;
}
```

---

## Data Models

### Theme Model
```typescript
interface Theme {
  name: 'dark' | 'light';
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    accent: string;
  };
}
```

### Service Model
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}
```

### Booking Model
```typescript
interface Booking {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: Date;
  preferredTime: string;
  serviceType: string;
  additionalNotes?: string;
  termsAccepted: boolean;
  createdAt?: Date;
}
```

### Pricing Tier Model
```typescript
interface PricingTier {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular: boolean;
}
```

### Gallery Image Model
```typescript
interface GalleryImage {
  id: string;
  src: string;
  srcWebP?: string;
  alt: string;
  thumbnail?: string;
  category: string;
}
```

---

## State Management with Angular Signals

### Theme State
```typescript
// theme.service.ts
export class ThemeService {
  currentTheme = signal<'dark' | 'light'>('dark');
  isDarkMode = computed(() => this.currentTheme() === 'dark');
  
  toggleTheme() {
    this.currentTheme.update(t => t === 'dark' ? 'light' : 'dark');
    this.persistTheme();
  }
}
```

### Booking Form State
```typescript
// booking.service.ts
export class BookingService {
  formData = signal<Partial<Booking>>({});
  validationErrors = signal<Record<string, string>>({});
  isSubmitting = signal(false);
  
  updateField(field: keyof Booking, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
```

### Navigation State
```typescript
// navigation.service.ts
export class NavigationService {
  mobileMenuOpen = signal(false);
  scrollPosition = signal(0);
  navbarScrolled = computed(() => this.scrollPosition() > 50);
  
  toggleMobileMenu() {
    this.mobileMenuOpen.update(open => !open);
  }
}
```

### Gallery State
```typescript
// gallery.service.ts
export class GalleryService {
  selectedImage = signal<GalleryImage | null>(null);
  lightboxOpen = computed(() => this.selectedImage() !== null);
  
  openLightbox(image: GalleryImage) {
    this.selectedImage.set(image);
  }
}
```

---

## Design System

### Color Palette

#### Dark Mode (Default)
- **Background**: Deep Elegant (#0F0F0F)
- **Surface**: Soft Dark (#1F1F1F)
- **Primary Accent**: Soft Rose Gold (#E8B4BC)
- **Secondary Accent**: Warm Gold (#D4AF37)
- **Text Primary**: White (#FFFFFF)
- **Text Secondary**: Off-White (#F5F0EB)
- **Text Tertiary**: Light Gray (#CCCCCC)
- **Highlight**: Blush Pink (#F8C1D4)
- **Border**: Dark Gray (#2A2A2A)

#### Light Mode
- **Background**: Soft Cream/Beige (#FAF8F3)
- **Surface**: Off-White (#FFFFFF)
- **Primary Accent**: Rose Gold (#D4A5B0)
- **Secondary Accent**: Gold (#C9A961)
- **Text Primary**: Deep Gray (#1F1F1F)
- **Text Secondary**: Medium Gray (#4A4A4A)
- **Text Tertiary**: Light Gray (#888888)
- **Highlight**: Blush Pink (#F8C1D4)
- **Border**: Light Gray (#E0E0E0)

### Typography

#### Font Stack
```css
font-family: 'Segoe UI', Trebuchet MS, sans-serif;
```

#### Type Scale
- **H1**: 48px / 56px (Hero headline)
- **H2**: 36px / 44px (Section titles)
- **H3**: 24px / 32px (Card titles)
- **Body Large**: 18px / 28px (Descriptions)
- **Body Regular**: 16px / 24px (Body text)
- **Body Small**: 14px / 20px (Secondary text)
- **Caption**: 12px / 16px (Labels, captions)

#### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Spacing System

Base unit: 8px

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px
- **4xl**: 80px

### Border Radius

- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **full**: 9999px

### Shadows

#### Dark Mode
- **sm**: 0 1px 2px rgba(0, 0, 0, 0.5)
- **md**: 0 4px 6px rgba(0, 0, 0, 0.6)
- **lg**: 0 10px 15px rgba(0, 0, 0, 0.7)
- **xl**: 0 20px 25px rgba(0, 0, 0, 0.8)
- **glow**: 0 0 20px rgba(232, 180, 188, 0.3)

#### Light Mode
- **sm**: 0 1px 2px rgba(0, 0, 0, 0.1)
- **md**: 0 4px 6px rgba(0, 0, 0, 0.15)
- **lg**: 0 10px 15px rgba(0, 0, 0, 0.2)
- **xl**: 0 20px 25px rgba(0, 0, 0, 0.25)
- **glow**: 0 0 20px rgba(212, 165, 176, 0.2)

### Glassmorphism Effects

```css
/* Dark Mode */
.glass-card-dark {
  background: rgba(31, 31, 31, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(232, 180, 188, 0.1);
}

/* Light Mode */
.glass-card-light {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 165, 176, 0.2);
}
```

---

## Layout and Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Grid System

#### Mobile (< 640px)
- Single column layout
- Full width with 16px padding
- Stacked components

#### Tablet (640px - 1024px)
- 2-column grid for cards
- 24px padding
- Flexible layouts

#### Desktop (> 1024px)
- 3-column grid for cards
- 32px padding
- Side-by-side layouts

### Section Layout Specifications

#### Hero Section
- Full viewport height (100vh)
- Centered content
- Particles background
- Gradient overlay

#### About Section
- Desktop: 2-column (text + image)
- Tablet/Mobile: Stacked
- Max-width: 1200px
- Centered container

#### Services Section
- Responsive grid (1/2/3 columns)
- Card height: auto
- Gap: 24px
- Max-width: 1400px

#### Pricing Section
- Responsive grid (1/2/3 columns)
- Card height: auto
- Gap: 24px
- Highlight "Most Popular" tier

#### Gallery Section
- Masonry/grid layout
- Responsive columns (1/2/3-4)
- Gap: 16px
- Aspect ratio: 1:1

#### Booking Form
- Max-width: 600px
- Desktop: 2-column fields
- Mobile: Single column
- Gap: 16px

#### Footer
- Multi-column layout (desktop)
- Stacked layout (mobile)
- Gap: 32px
- Background: Slightly darker surface

---

## Animation and Transition Specifications

### Timing Functions
- **Ease-out**: cubic-bezier(0.16, 1, 0.3, 1) - For entrance animations
- **Ease-in-out**: cubic-bezier(0.4, 0, 0.2, 1) - For transitions
- **Ease-in**: cubic-bezier(0.7, 0, 1, 0.3) - For exit animations

### Animation Durations
- **Fast**: 150ms - Micro-interactions
- **Normal**: 300ms - Hover effects, transitions
- **Slow**: 600ms - Section reveals, page load

### Animation Specifications

#### Fade In + Slide Up (Section Reveal)
- Duration: 600ms
- Easing: ease-out
- Properties: opacity, transform (translateY)
- Initial: opacity 0, translateY(20px)
- Final: opacity 1, translateY(0)
- Trigger: Scroll into viewport

#### Card Hover Lift
- Duration: 300ms
- Easing: ease-out
- Properties: transform, box-shadow
- Effect: translateY(-8px), enhanced shadow
- Applied to: Service cards, pricing cards, gallery images

#### Button Hover Scale + Shimmer
- Duration: 300ms
- Easing: ease-out
- Properties: transform, background
- Effect: scale(1.05), shimmer animation
- Applied to: CTA buttons

#### Particle Animation
- Duration: Infinite
- Motion: Gentle floating
- Speed: Very slow (0.5-1 pixel/second)
- Opacity: Subtle pulsing (0.3-0.8)
- Colors: Rose gold, warm gold

#### Theme Transition
- Duration: 300ms
- Easing: ease-in-out
- Properties: background-color, color, border-color
- Applied to: All elements

#### Scroll Navbar Blur
- Duration: 300ms
- Easing: ease-in-out
- Properties: backdrop-filter, box-shadow
- Trigger: Scroll > 50px

#### Staggered Card Animation
- Base delay: 0ms
- Stagger offset: 100ms per card
- Applied to: Service cards, pricing cards, gallery images

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme Toggle Switches State
*For any current theme state, clicking the theme toggle button SHALL switch to the opposite theme (dark ↔ light)*

**Validates: Requirements 1.1, 1.5**

### Property 2: Theme Persistence Round Trip
*For any selected theme, storing it in localStorage and retrieving it on page reload SHALL restore the same theme*

**Validates: Requirements 1.2, 25.1-25.4**

### Property 3: Theme Icon Reflects Current Mode
*For any theme state, the theme toggle button SHALL display the Sun icon when in dark mode and Moon icon when in light mode*

**Validates: Requirements 1.5**

### Property 4: All Components Update on Theme Change
*For any theme change, all components (Navbar, sections, Footer) SHALL update their colors to match the selected theme*

**Validates: Requirements 1.6, 14.1-14.9, 15.1-15.8**

### Property 5: Navigation Links Present
*For any navbar state, all required navigation links (Home, About, Services, Pricing, Gallery, Contact) SHALL be present*

**Validates: Requirements 2.2**

### Property 6: Navigation Link Scrolls to Section
*For any navigation link, clicking it SHALL scroll the page to the corresponding section*

**Validates: Requirements 2.3**

### Property 7: Mobile Hamburger Menu Displays
*For any mobile viewport (< 640px), the navbar SHALL display a hamburger menu icon instead of full navigation links*

**Validates: Requirements 2.6, 10.4**

### Property 8: Mobile Menu Expands on Click
*For any mobile state, clicking the hamburger menu SHALL expand to show all navigation links*

**Validates: Requirements 2.7**

### Property 9: Mobile Menu Collapses on Navigation
*For any expanded mobile menu, clicking a navigation link SHALL collapse the menu*

**Validates: Requirements 2.8**

### Property 10: Hero Section Full Viewport Height
*For any viewport size, the hero section height SHALL equal the viewport height on initial page load*

**Validates: Requirements 3.3**

### Property 11: Button Hover Scale Applied
*For any button hover state, the button SHALL scale to 1.05 times its original size*

**Validates: Requirements 3.7, 29.3**

### Property 12: Service Cards Display in Correct Grid
*For any screen size, service cards SHALL display in 1 column (mobile), 2 columns (tablet), or 3 columns (desktop)*

**Validates: Requirements 5.4-5.6, 30.6**

### Property 13: Service Cards Hover Lift Applied
*For any service card hover state, the card SHALL lift 8 pixels and display a rose gold glow effect*

**Validates: Requirements 5.7**

### Property 14: Pricing Cards Display in Correct Grid
*For any screen size, pricing cards SHALL display in 1 column (mobile), 2 columns (tablet), or 3 columns (desktop)*

**Validates: Requirements 6.5-6.6**

### Property 15: Pricing Cards Hover Lift Applied
*For any pricing card hover state, the card SHALL lift 8 pixels and display a rose gold glow effect*

**Validates: Requirements 6.7**

### Property 16: Gallery Images Display in Correct Grid
*For any screen size, gallery images SHALL display in 1 column (mobile), 2 columns (tablet), or 3-4 columns (desktop)*

**Validates: Requirements 7.4-7.6**

### Property 17: Gallery Image Hover Zoom Applied
*For any gallery image hover state, the image SHALL zoom to 1.1 times its original size*

**Validates: Requirements 7.7**

### Property 18: Lightbox Opens on Image Click
*For any gallery image click, the image SHALL open in a lightbox showing the full-size version*

**Validates: Requirements 7.8**

### Property 19: Form Validation Rejects Empty Full Name
*For any form submission with empty Full Name field, the form SHALL display error "Full Name is required"*

**Validates: Requirements 18.1**

### Property 20: Form Validation Rejects Short Full Name
*For any Full Name with fewer than 2 characters, the form SHALL display error "Full Name must be at least 2 characters"*

**Validates: Requirements 18.2**

### Property 21: Form Validation Rejects Invalid Email
*For any invalid email format, the form SHALL display error "Email must be a valid email address"*

**Validates: Requirements 18.6**

### Property 22: Form Validation Rejects Past Date
*For any past date selection, the form SHALL display error "Preferred Date must be in the future"*

**Validates: Requirements 18.8**

### Property 23: Form Validation Rejects Unchecked Terms
*For any form submission without Terms & Conditions checked, the form SHALL display error "You must agree to the Terms & Conditions"*

**Validates: Requirements 18.11**

### Property 24: Form Error Clears on Field Correction
*For any field with validation error, correcting the field value SHALL clear the error message*

**Validates: Requirements 18.12**

### Property 25: Form Submission Clears Fields
*For any successful form submission, all form fields SHALL be cleared*

**Validates: Requirements 19.4**

### Property 26: Color Contrast Meets WCAG AA
*For any text on any background, the color contrast ratio SHALL meet or exceed 4.5:1 for normal text and 3:1 for large text*

**Validates: Requirements 16.1-16.5**

### Property 27: Keyboard Navigation Tab Order
*For any interactive element, pressing Tab SHALL move focus to the next interactive element in logical order*

**Validates: Requirements 17.1-17.7**

### Property 28: Responsive Layout Adapts to Viewport
*For any viewport size, the layout SHALL adapt appropriately (single column mobile, multi-column desktop)*

**Validates: Requirements 10.1-10.9, 11.1-11.6, 12.1-12.6**

### Property 29: Particles Configured Correctly
*For any particle initialization, particles SHALL have colors (rose gold, warm gold), count (10-20), size (2-4px), and gentle floating motion*

**Validates: Requirements 3.6, 28.1-28.7**

### Property 30: Glassmorphism Applied to Cards
*For any card component, glassmorphism styling (semi-transparent background + blur) SHALL be applied*

**Validates: Requirements 5.10, 27.1-27.6**

---

## Error Handling

### Form Validation Errors
- Display inline error messages below each field
- Use red/warning color for error text
- Clear errors when field is corrected
- Prevent form submission with validation errors

### API/Submission Errors
- Display error notification via ngx-toastr
- Include descriptive error message
- Provide retry option for failed submissions
- Log errors for debugging

### Network Errors
- Detect network failures
- Display offline notification
- Queue submissions for retry when online
- Graceful degradation

### Animation Errors
- Fallback to instant state changes if animations fail
- Disable animations on low-end devices
- Monitor animation performance

---

## Testing Strategy

### Unit Tests (Example-Based)
- Component initialization and lifecycle
- Service method functionality
- Form field validation logic
- Theme switching logic
- Navigation link routing
- Error message display

### Property-Based Tests
- Theme toggle switches state correctly
- Theme persistence round-trip
- Navigation links scroll to sections
- Responsive grid layouts adapt correctly
- Form validation rejects invalid inputs
- Color contrast meets accessibility standards
- Keyboard navigation works in logical order
- Particles initialize with correct properties
- Glassmorphism effects apply to cards
- Hover effects scale and glow correctly

### Integration Tests
- Page load performance (< 3 seconds on 4G)
- Scroll-triggered animations
- Form submission flow
- Notification display
- Image lazy loading
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness
- Accessibility compliance

### Visual Regression Tests
- Navbar blur effect on scroll
- Theme transition smoothness
- Card hover effects
- Button hover effects
- Particle animations
- Scroll reveal animations

### Accessibility Tests
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus indicators
- Semantic HTML structure

### Performance Tests
- Lighthouse score > 90
- LCP < 2.5 seconds
- CLS < 0.1
- Image optimization (WebP format)
- Bundle size optimization
- Animation frame rate (60fps)

---

## Performance Optimization Strategies

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for gallery images
- Responsive image sizes (srcset)
- Image compression and optimization
- CDN delivery for images

### Code Splitting
- Lazy load feature components
- Separate bundle for animations
- Tree-shaking unused code
- Minification and compression

### Animation Performance
- Use GPU-accelerated properties (transform, opacity)
- Avoid layout-triggering properties
- Debounce scroll events
- Disable animations on low-end devices
- Use requestAnimationFrame for smooth animations

### Bundle Optimization
- Remove unused dependencies
- Optimize Tailwind CSS output
- Minify CSS and JavaScript
- Gzip compression
- Tree-shaking

### Caching Strategy
- Browser caching for static assets
- Service worker for offline support
- LocalStorage for theme preference
- Cache busting for updated assets

---

## Accessibility Considerations

### Keyboard Navigation
- Tab order follows logical flow
- Focus indicators clearly visible
- Escape key closes modals/menus
- Enter key activates buttons/links
- All interactive elements keyboard accessible

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for icons
- Alt text for images
- Form labels associated with inputs
- Landmark regions (header, nav, main, footer)

### Color Contrast
- 4.5:1 ratio for normal text
- 3:1 ratio for large text
- 3:1 ratio for focus indicators
- Sufficient contrast in both themes

### Visual Indicators
- Clear focus indicators
- Hover states visible
- Error messages in color + text
- Loading states indicated
- Disabled states clearly marked

### Motion and Animation
- Respect prefers-reduced-motion
- Animations not essential to functionality
- No auto-playing animations
- Pause/stop controls for animations

### Form Accessibility
- Labels for all form fields
- Error messages associated with fields
- Required fields marked
- Validation feedback clear
- Success confirmation provided

---

## Integration Points

### External Libraries
- **ts-particles (ngx-particles)**: Hero section particle effects
- **lucide-angular**: Service and feature icons
- **ngx-toastr**: Success/error notifications
- **Angular Animations**: Smooth transitions and reveals
- **Tailwind CSS**: Utility-first styling

### Services Integration
- **ThemeService**: Global theme state management
- **BookingService**: Form state and submission
- **NotificationService**: Toast notifications
- **NavigationService**: Scroll and menu state

### API Integration Points
- Booking form submission endpoint
- Contact form submission endpoint
- Image loading from CDN
- Analytics tracking

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- CSS Grid fallback for older browsers
- Flexbox for layout
- Standard CSS for custom properties
- Graceful degradation for animations

---

## Deployment Considerations

### Build Optimization
- Production build with optimization flags
- Source maps for debugging
- Environment-specific configurations
- Asset optimization

### Performance Monitoring
- Lighthouse CI integration
- Core Web Vitals monitoring
- Error tracking and logging
- User analytics

### Security
- Content Security Policy headers
- HTTPS enforcement
- Input sanitization
- XSS protection

---

## Future Enhancements

1. **Advanced Booking**: Calendar integration, real-time availability
2. **User Accounts**: Login, booking history, preferences
3. **Payment Integration**: Online payment processing
4. **Reviews and Ratings**: Customer testimonials
5. **Blog Section**: Beauty tips and wellness articles
6. **Live Chat**: Real-time customer support
7. **Mobile App**: Native iOS/Android applications
8. **Multi-language Support**: Internationalization (i18n)
9. **Advanced Analytics**: Detailed user behavior tracking
10. **AI Recommendations**: Personalized service suggestions
