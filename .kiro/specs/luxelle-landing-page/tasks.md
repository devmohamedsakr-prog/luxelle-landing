# Implementation Plan: Luxelle Landing Page

## Overview

This implementation plan breaks down the Luxelle landing page into discrete, manageable coding tasks organized by logical phases. Each task builds incrementally on previous work, with integrated testing at key checkpoints. The implementation uses Angular 21/22 with Standalone Components, Signals for state management, Tailwind CSS for styling, and integrates ts-particles, lucide-angular, and ngx-toastr.

## Phase 1: Project Setup & Configuration

- [x] 1.1 Initialize project dependencies and build configuration
  - Install Angular 21/22 dependencies
  - Install Tailwind CSS, PostCSS, and Autoprefixer
  - Install ts-particles (ngx-particles), lucide-angular, and ngx-toastr
  - Configure package.json scripts for development and production builds
  - _Requirements: 24.1-24.8_

- [x] 1.2 Configure Tailwind CSS with custom design system
  - Create tailwind.config.ts with custom color palette (dark mode and light mode colors)
  - Configure custom spacing scale (8px base unit)
  - Configure custom border radius values
  - Configure custom shadow definitions (including glow effects)
  - Configure custom animation definitions
  - _Requirements: 24.3, 14.1-14.9, 15.1-15.8_

- [x] 1.3 Setup PostCSS and Autoprefixer configuration
  - Create postcss.config.js with Tailwind CSS and Autoprefixer plugins
  - Configure CSS processing pipeline
  - _Requirements: 24.3_

- [x] 1.4 Create centralized styling system
  - Create src/styles/globals.css with CSS custom properties for theme colors
  - Create src/styles/tailwind.css with Tailwind directives
  - Define glassmorphism utility classes
  - Define animation utility classes
  - _Requirements: 24.3, 27.1-27.6_

- [x] 1.5 Configure Angular animations module
  - Import BrowserAnimationsModule in app.config.ts
  - Create src/app/shared/animations/animations.ts with reusable animation definitions
  - Define fade-in, slide-up, scale, and shimmer animations
  - _Requirements: 24.4, 13.1-13.10_

- [x] 1.6 Setup ngx-particles configuration
  - Create src/app/shared/particles/particles-config.ts with particle effect configurations
  - Configure rose gold and warm gold particle colors
  - Configure particle count (10-20), size (2-4px), and gentle floating motion
  - _Requirements: 3.6, 28.1-28.7, 29.1-29.3_

- [x] 1.7 Configure ngx-toastr for notifications
  - Import ToastrModule in app.config.ts
  - Configure toast position, duration, and styling
  - _Requirements: 24.7, 19.1-19.8_



## Phase 2: Core Services & State Management

- [x] 2.1 Create ThemeService with Signals for dark/light mode
  - Create src/app/core/services/theme.service.ts
  - Implement currentTheme signal with 'dark' | 'light' type
  - Implement isDarkMode computed signal
  - Implement toggleTheme() method
  - Implement persistTheme() method to save to localStorage
  - Implement loadTheme() method to restore from localStorage
  - _Requirements: 1.1-1.6, 14.1-14.9, 15.1-15.8, 25.1-25.4_

- [ ] 2.2 Write property test for theme toggle
  - **Property 1: Theme Toggle Switches State**
  - **Validates: Requirements 1.1, 1.5**

- [x] 2.3 Create BookingService for form state management
  - Create src/app/core/services/booking.service.ts
  - Implement formData signal for Booking model
  - Implement validationErrors signal for error tracking
  - Implement isSubmitting signal for loading state
  - Implement updateField() method for reactive form updates
  - Implement validateForm() method with all validation rules
  - Implement submitBooking() method for form submission
  - Implement clearForm() method to reset form state
  - _Requirements: 8.1-8.19, 18.1-18.13, 19.1-19.8_

- [-] 2.4 Write property tests for booking form validation
  - **Property 19: Form Validation Rejects Empty Full Name**
  - **Validates: Requirements 18.1**
  - **Property 20: Form Validation Rejects Short Full Name**
  - **Validates: Requirements 18.2**
  - **Property 21: Form Validation Rejects Invalid Email**
  - **Validates: Requirements 18.6**
  - **Property 22: Form Validation Rejects Past Date**
  - **Validates: Requirements 18.8**
  - **Property 23: Form Validation Rejects Unchecked Terms**
  - **Validates: Requirements 18.11**

- [x] 2.5 Create NotificationService for toast notifications
  - Create src/app/core/services/notification.service.ts
  - Implement showSuccess() method using ngx-toastr
  - Implement showError() method using ngx-toastr
  - Implement showInfo() method using ngx-toastr
  - Configure notification duration and positioning
  - _Requirements: 19.1-19.8_

- [ ] 2.6 Create NavigationService for scroll and menu state
  - Create src/app/core/services/navigation.service.ts
  - Implement mobileMenuOpen signal
  - Implement scrollPosition signal
  - Implement navbarScrolled computed signal (true when scrollPosition > 50)
  - Implement toggleMobileMenu() method
  - Implement updateScrollPosition() method
  - Implement scrollToSection() method for smooth scrolling
  - _Requirements: 2.3, 2.6-2.8, 26.1-26.5_

- [ ] 2.7 Create GalleryService for lightbox state
  - Create src/app/core/services/gallery.service.ts
  - Implement selectedImage signal
  - Implement lightboxOpen computed signal
  - Implement openLightbox() method
  - Implement closeLightbox() method
  - Implement nextImage() and previousImage() methods for navigation
  - _Requirements: 7.8-7.9_

- [ ] 2.8 Setup LocalStorage persistence for theme
  - Implement localStorage key constants in src/app/core/constants/app.constants.ts
  - Integrate localStorage persistence in ThemeService
  - Test persistence across page reloads
  - _Requirements: 1.2, 25.1-25.4_



## Phase 3: UI Component Library

- [x] 3.1 Create Button component with variants
  - Create src/app/shared/components/ui/button/button.component.ts as standalone
  - Implement primary, secondary, and outline variants
  - Implement size variants (sm, md, lg)
  - Implement disabled and loading states
  - Apply hover scale and shimmer animations
  - _Requirements: 24.1, 3.7, 29.3_

- [ ] 3.2 Write unit tests for Button component
  - Test all variant combinations
  - Test disabled and loading states
  - Test click event emission
  - _Requirements: 3.7_

- [x] 3.3 Create Card component with glassmorphism
  - Create src/app/shared/components/ui/card/card.component.ts as standalone
  - Implement glassmorphism styling with semi-transparent background and blur
  - Implement optional title, description, and icon slots
  - Implement hoverable variant with lift effect
  - Apply hover lift and glow animations
  - _Requirements: 24.1, 27.1-27.6, 30.1-30.3_

- [ ] 3.4 Write unit tests for Card component
  - Test glassmorphism styling application
  - Test hover effects
  - Test content projection
  - _Requirements: 27.1-27.6_

- [x] 3.5 Create Input component with validation
  - Create src/app/shared/components/ui/input/input.component.ts as standalone
  - Support text, email, tel, date, and time input types
  - Implement error message display
  - Implement required field indicator
  - Implement focus and blur event handling
  - _Requirements: 24.1, 8.3-8.7, 18.1-18.13_

- [ ] 3.6 Write unit tests for Input component
  - Test all input types
  - Test validation error display
  - Test value change events
  - _Requirements: 8.3-8.7_

- [ ] 3.7 Create Select component
  - Create src/app/shared/components/ui/select/select.component.ts as standalone
  - Implement dropdown with options array
  - Implement placeholder text
  - Implement error message display
  - Implement value change event handling
  - _Requirements: 24.1, 8.8_

- [ ] 3.8 Create Textarea component
  - Create src/app/shared/components/ui/textarea/textarea.component.ts as standalone
  - Implement configurable rows
  - Implement placeholder text
  - Implement value change event handling
  - _Requirements: 24.1, 8.9_

- [ ] 3.9 Create Checkbox component
  - Create src/app/shared/components/ui/checkbox/checkbox.component.ts as standalone
  - Implement checked state signal
  - Implement label text
  - Implement change event handling
  - _Requirements: 24.1, 8.10_

- [ ] 3.10 Create shared animations directive
  - Create src/app/shared/directives/animations.directive.ts
  - Implement scroll-reveal animation trigger
  - Implement hover animation trigger
  - Implement staggered animation support
  - _Requirements: 13.1-13.10, 26.1-26.5_



## Phase 4: Layout & Navigation

- [ ] 4.1 Create main layout component
  - Create src/app/layout/main-layout/main-layout.component.ts as standalone
  - Implement layout structure with header, main content, and footer
  - Setup router outlet for page content
  - Implement scroll event listener for navbar blur effect
  - _Requirements: 2.1-2.8, 24.1_

- [x] 4.2 Create Navbar component with logo and navigation
  - Create src/app/layout/navbar/navbar.component.ts as standalone
  - Display Luxelle logo
  - Display navigation links (Home, About, Services, Pricing, Gallery, Contact)
  - Implement theme toggle button with Sun/Moon icons
  - Implement smooth scroll navigation to sections
  - Implement responsive design (full nav on desktop, hamburger on mobile)
  - _Requirements: 2.1-2.8, 1.1-1.6_

- [ ] 4.3 Write property tests for navbar navigation
  - **Property 5: Navigation Links Present**
  - **Validates: Requirements 2.2**
  - **Property 6: Navigation Link Scrolls to Section**
  - **Validates: Requirements 2.3**
  - **Property 7: Mobile Hamburger Menu Displays**
  - **Validates: Requirements 2.6, 10.4**

- [ ] 4.4 Create responsive hamburger menu
  - Implement hamburger menu icon for mobile (< 640px)
  - Implement menu expansion/collapse animation
  - Implement menu close on navigation link click
  - Implement menu close on Escape key press
  - _Requirements: 2.6-2.8, 10.4, 17.6_

- [ ] 4.5 Write property tests for hamburger menu
  - **Property 8: Mobile Menu Expands on Click**
  - **Validates: Requirements 2.7**
  - **Property 9: Mobile Menu Collapses on Navigation**
  - **Validates: Requirements 2.8**

- [ ] 4.6 Implement smooth scroll navigation
  - Create scroll-to-section utility function
  - Implement smooth scroll behavior
  - Update URL hash on scroll
  - Handle scroll offset for navbar height
  - _Requirements: 2.3, 26.1-26.5_

- [ ] 4.7 Implement navbar blur effect on scroll
  - Detect scroll position > 50px
  - Apply backdrop-filter blur effect
  - Add shadow effect
  - Animate transition smoothly (300ms)
  - _Requirements: 2.5, 13.6_

- [x] 4.8 Create Footer component
  - Create src/app/layout/footer/footer.component.ts as standalone
  - Display Luxelle logo
  - Display quick navigation links
  - Display contact information (phone, email, address)
  - Display social media icons (Instagram, Facebook, LinkedIn)
  - Display copyright notice with current year
  - Implement responsive layout (stacked on mobile, columns on desktop)
  - _Requirements: 9.1-9.10_



## Phase 5: Feature Components - Hero & About

- [x] 5.1 Create Hero component with headline and CTA
  - Create src/app/features/hero/hero.component.ts as standalone
  - Display headline "Luxelle – Where Beauty Meets Elegance"
  - Display subtitle "Experience luxury skincare, wellness, and beauty treatments in a sophisticated atmosphere"
  - Display "Book Your Experience" CTA button
  - Set full viewport height (100vh)
  - Implement fade-in and slide-up animation on load (600ms)
  - _Requirements: 3.1-3.5, 3.7, 13.8_

- [ ] 5.2 Integrate ts-particles for hero section
  - Initialize ngx-particles in hero component
  - Configure particle colors (rose gold #E8B4BC, warm gold #D4AF37)
  - Configure particle count (10-20), size (2-4px)
  - Implement gentle floating motion with very slow speed
  - Implement subtle opacity pulsing
  - _Requirements: 3.6, 28.1-28.7, 29.1-29.3_

- [ ] 5.3 Write property test for hero particles
  - **Property 29: Particles Configured Correctly**
  - **Validates: Requirements 3.6, 28.1-28.7**

- [x] 5.4 Create About component with text and image
  - Create src/app/features/about/about.component.ts as standalone
  - Display "About Luxelle" title
  - Display 2-3 paragraphs about brand, values, and commitment
  - Display image (placeholder or actual image)
  - Implement side-by-side layout on desktop (text + image)
  - Implement stacked layout on mobile/tablet
  - _Requirements: 4.1-4.7_

- [ ] 5.5 Implement about section scroll reveal animation
  - Apply fade-in and slide-up animation when section enters viewport
  - Use 600ms duration with ease-out easing
  - Implement staggered animation for text and image
  - _Requirements: 4.3, 13.1, 26.1-26.5_

- [ ] 5.6 Write unit tests for hero and about components
  - Test component initialization
  - Test content display
  - Test animation triggers
  - _Requirements: 3.1-3.8, 4.1-4.7_



## Phase 6: Feature Components - Services & Pricing

- [x] 6.1 Create Services component with service cards
  - Create src/app/features/services/services.component.ts as standalone
  - Display "Our Services" title
  - Create 8 service cards (Skincare, Hair Styling, Makeup, Spa, Lashes, Nails, Facial, Wellness)
  - Implement responsive grid (1 column mobile, 2 tablet, 3 desktop)
  - _Requirements: 5.1-5.3, 5.4-5.6_

- [ ] 6.2 Create ServiceCard component with icon and description
  - Create src/app/shared/components/service-card/service-card.component.ts as standalone
  - Display service icon from lucide-angular
  - Display service name and description
  - Apply glassmorphism styling
  - Implement hover lift (8px) and glow effect
  - _Requirements: 5.7, 5.9-5.10, 30.1-30.3_

- [ ] 6.3 Write property tests for service cards
  - **Property 12: Service Cards Display in Correct Grid**
  - **Validates: Requirements 5.4-5.6, 30.6**
  - **Property 13: Service Cards Hover Lift Applied**
  - **Validates: Requirements 5.7**

- [ ] 6.4 Implement staggered service card animations
  - Apply fade-in and slide-up animation to each card
  - Implement 100ms stagger offset between cards
  - Trigger animation when section enters viewport
  - _Requirements: 5.8, 26.1-26.5_

- [x] 6.5 Create Pricing component with pricing tiers
  - Create src/app/features/pricing/pricing.component.ts as standalone
  - Display "Pricing" title
  - Create 4 pricing tier cards (Essential, Premium, Luxury, VIP)
  - Highlight Luxury tier as "Most Popular"
  - Implement responsive grid (1 column mobile, 2-3 desktop)
  - _Requirements: 6.1-6.4, 6.5-6.6_

- [ ] 6.6 Create PricingCard component with tier details
  - Create src/app/shared/components/pricing-card/pricing-card.component.ts as standalone
  - Display tier name, price, duration, and features list
  - Display "Book Now" CTA button
  - Apply glassmorphism styling
  - Implement hover lift (8px) and glow effect
  - Highlight "Most Popular" tier with different styling
  - _Requirements: 6.3-6.4, 6.7, 6.10_

- [ ] 6.7 Write property tests for pricing cards
  - **Property 14: Pricing Cards Display in Correct Grid**
  - **Validates: Requirements 6.5-6.6**
  - **Property 15: Pricing Cards Hover Lift Applied**
  - **Validates: Requirements 6.7**

- [ ] 6.8 Implement staggered pricing card animations
  - Apply fade-in and slide-up animation to each card
  - Implement 100ms stagger offset between cards
  - Trigger animation when section enters viewport
  - _Requirements: 6.8, 26.1-26.5_

- [ ] 6.9 Wire pricing cards to booking form
  - Implement "Book Now" button click handler
  - Scroll to booking form section
  - Pre-populate service type if applicable
  - _Requirements: 6.9_



## Phase 7: Feature Components - Gallery & Lightbox

- [x] 7.1 Create Gallery component with masonry/grid layout
  - Create src/app/features/gallery/gallery.component.ts as standalone
  - Display "Gallery" title
  - Display 8-12 gallery images in responsive grid
  - Implement responsive layout (1 column mobile, 2 tablet, 3-4 desktop)
  - _Requirements: 7.1-7.3, 7.4-7.6_

- [ ] 7.2 Create GalleryImage component with lazy loading
  - Create src/app/shared/components/gallery-image/gallery-image.component.ts as standalone
  - Implement lazy loading using IntersectionObserver
  - Support WebP format with fallback to JPEG
  - Implement hover zoom effect (1.1x scale)
  - Implement overlay on hover
  - _Requirements: 7.7, 7.10-7.11, 21.1-21.5_

- [ ] 7.3 Write property tests for gallery layout
  - **Property 16: Gallery Images Display in Correct Grid**
  - **Validates: Requirements 7.4-7.6**
  - **Property 17: Gallery Image Hover Zoom Applied**
  - **Validates: Requirements 7.7**

- [ ] 7.4 Create Lightbox modal component
  - Create src/app/shared/components/lightbox/lightbox.component.ts as standalone
  - Display full-size image
  - Implement close button (X icon)
  - Implement previous/next navigation buttons
  - Implement keyboard navigation (arrow keys, Escape)
  - Implement backdrop click to close
  - _Requirements: 7.8-7.9, 17.6_

- [ ] 7.5 Implement lightbox open/close functionality
  - Wire gallery image clicks to open lightbox
  - Pass selected image to lightbox component
  - Implement smooth open/close animations
  - Prevent body scroll when lightbox is open
  - _Requirements: 7.8_

- [ ] 7.6 Implement lightbox image navigation
  - Implement next/previous button functionality
  - Implement keyboard arrow key navigation
  - Implement image counter display
  - Wrap around at start/end of gallery
  - _Requirements: 7.9_

- [ ] 7.7 Write property test for lightbox functionality
  - **Property 18: Lightbox Opens on Image Click**
  - **Validates: Requirements 7.8**

- [ ] 7.8 Implement staggered gallery image animations
  - Apply fade-in animation to each image
  - Implement 100ms stagger offset between images
  - Trigger animation when section enters viewport
  - _Requirements: 7.9, 26.1-26.5_



## Phase 8: Booking Form Implementation

- [x] 8.1 Create Booking component with form structure
  - Create src/app/features/booking/booking.component.ts as standalone
  - Display "Book Your Appointment" title
  - Create form with all required fields
  - Implement responsive layout (1 column mobile, 2 desktop)
  - _Requirements: 8.1-8.2, 8.17-8.19_

- [ ] 8.2 Implement form field components
  - Create Full Name text input field
  - Create Phone Number tel input field
  - Create Email email input field
  - Create Preferred Date date picker field
  - Create Preferred Time time picker field
  - Create Service Type select dropdown
  - Create Additional Notes textarea field
  - Create Terms & Conditions checkbox
  - _Requirements: 8.3-8.10_

- [ ] 8.3 Implement form validation logic
  - Validate Full Name (required, min 2 characters)
  - Validate Phone Number (required, valid format)
  - Validate Email (required, valid format)
  - Validate Preferred Date (required, not in past)
  - Validate Preferred Time (required)
  - Validate Service Type (required)
  - Validate Terms & Conditions (required)
  - Display inline error messages for each field
  - _Requirements: 18.1-18.13_

- [ ] 8.4 Write property tests for form validation
  - **Property 19: Form Validation Rejects Empty Full Name**
  - **Validates: Requirements 18.1**
  - **Property 20: Form Validation Rejects Short Full Name**
  - **Validates: Requirements 18.2**
  - **Property 21: Form Validation Rejects Invalid Email**
  - **Validates: Requirements 18.6**
  - **Property 22: Form Validation Rejects Past Date**
  - **Validates: Requirements 18.8**
  - **Property 23: Form Validation Rejects Unchecked Terms**
  - **Validates: Requirements 18.11**
  - **Property 24: Form Error Clears on Field Correction**
  - **Validates: Requirements 18.12**

- [ ] 8.5 Implement form submission handling
  - Create submit button with primary accent color
  - Implement form validation on submit
  - Display loading state on submit button
  - Handle successful submission
  - Handle submission errors
  - _Requirements: 8.11-8.16, 19.1-19.8_

- [ ] 8.6 Implement success/error notifications
  - Display success notification on successful submission
  - Display error notification on submission failure
  - Clear form fields on success
  - Persist error messages for user review
  - _Requirements: 19.1-19.8_

- [ ] 8.7 Write property test for form submission
  - **Property 25: Form Submission Clears Fields**
  - **Validates: Requirements 19.4**

- [ ] 8.8 Implement booking form scroll reveal animation
  - Apply fade-in and slide-up animation when section enters viewport
  - Use 600ms duration with ease-out easing
  - _Requirements: 8.19, 26.1-26.5_



## Phase 9: Responsive Design & Mobile Optimization

- [ ] 9.1 Test and refine mobile layouts (< 640px)
  - Test all sections on mobile viewport
  - Verify single-column layout for all components
  - Verify text readability without zooming
  - Verify touch target sizes (minimum 44px)
  - Verify hero headline font size (32px or larger)
  - Verify hamburger menu functionality
  - _Requirements: 10.1-10.9_

- [ ] 9.2 Test and refine tablet layouts (640-1024px)
  - Test all sections on tablet viewport
  - Verify 2-column layout for service cards
  - Verify 2-column layout for pricing cards
  - Verify 2-column layout for gallery images
  - Verify 2-column layout for booking form fields
  - _Requirements: 11.1-11.6_

- [ ] 9.3 Test and refine desktop layouts (> 1024px)
  - Test all sections on desktop viewport
  - Verify 3-column layout for service cards
  - Verify 3-column layout for pricing cards
  - Verify 3-4 column layout for gallery images
  - Verify side-by-side layout for about section
  - Verify 2-column layout for booking form fields
  - _Requirements: 12.1-12.6_

- [ ] 9.4 Implement touch-friendly interactions
  - Increase touch target sizes on mobile
  - Implement touch-friendly hover states
  - Implement swipe gestures for gallery navigation
  - Test on actual mobile devices
  - _Requirements: 10.3_

- [ ] 9.5 Test hamburger menu on mobile
  - Verify menu opens on click
  - Verify menu closes on link click
  - Verify menu closes on Escape key
  - Verify menu is accessible via keyboard
  - _Requirements: 2.6-2.8, 10.4_

- [ ] 9.6 Verify responsive images and text sizing
  - Test image scaling across breakpoints
  - Verify text sizing is readable on all devices
  - Test responsive font sizes
  - Verify line heights are appropriate
  - _Requirements: 10.2, 11.2, 12.1_

- [ ] 9.7 Write property test for responsive layout
  - **Property 28: Responsive Layout Adapts to Viewport**
  - **Validates: Requirements 10.1-10.9, 11.1-11.6, 12.1-12.6**



## Phase 10: Animations & Effects

- [ ] 10.1 Implement section reveal animations
  - Apply fade-in and slide-up animation to all sections
  - Use 600ms duration with ease-out easing
  - Implement scroll trigger using IntersectionObserver
  - Trigger animation when section enters viewport
  - _Requirements: 13.1, 26.1-26.5_

- [ ] 10.2 Implement card hover animations
  - Apply lift effect (translateY -8px) on hover
  - Apply glow effect (box-shadow with rose gold)
  - Use 300ms duration with ease-out easing
  - Apply to service cards, pricing cards, gallery images
  - _Requirements: 5.7, 6.7, 7.7, 13.2-13.3_

- [ ] 10.3 Implement button hover animations
  - Apply scale effect (1.05x) on hover
  - Apply shimmer effect on hover
  - Use 300ms duration with ease-out easing
  - Apply to all CTA buttons
  - _Requirements: 3.7, 13.5, 29.3_

- [ ] 10.4 Implement particle animations
  - Configure gentle floating motion
  - Implement very slow speed (0.5-1 pixel/second)
  - Implement subtle opacity pulsing (0.3-0.8)
  - Ensure smooth 60fps animation
  - _Requirements: 3.6, 28.1-28.7, 29.1-29.3_

- [ ] 10.5 Implement theme transition animations
  - Apply smooth color transitions on theme change
  - Use 300ms duration with ease-in-out easing
  - Transition all color properties
  - _Requirements: 1.4, 13.6_

- [ ] 10.6 Implement scroll-triggered navbar blur
  - Detect scroll position > 50px
  - Apply backdrop-filter blur effect
  - Add shadow effect
  - Use 300ms transition duration
  - _Requirements: 2.5, 13.6_

- [ ] 10.7 Implement staggered animations for card grids
  - Apply 100ms stagger offset between cards
  - Implement staggered fade-in and slide-up
  - Apply to service cards, pricing cards, gallery images
  - _Requirements: 5.8, 6.8, 7.9, 26.1-26.5_

- [ ] 10.8 Write unit tests for animations
  - Test animation triggers
  - Test animation durations
  - Test animation easing functions
  - Test staggered animation timing
  - _Requirements: 13.1-13.10_



## Phase 11: Accessibility & SEO

- [ ] 11.1 Implement keyboard navigation
  - Ensure Tab key moves focus to next interactive element
  - Ensure Shift+Tab moves focus to previous element
  - Ensure logical tab order throughout page
  - Ensure Escape key closes modals/menus
  - Ensure Enter key activates buttons/links
  - _Requirements: 17.1-17.7_

- [ ] 11.2 Write property test for keyboard navigation
  - **Property 27: Keyboard Navigation Tab Order**
  - **Validates: Requirements 17.1-17.7**

- [ ] 11.3 Add ARIA labels and roles
  - Add aria-label to icon buttons
  - Add aria-expanded to hamburger menu
  - Add aria-hidden to decorative elements
  - Add role="navigation" to nav elements
  - Add role="main" to main content
  - Add role="contentinfo" to footer
  - _Requirements: 17.1-17.7_

- [ ] 11.4 Verify color contrast ratios
  - Test all text on all backgrounds
  - Verify 4.5:1 ratio for normal text
  - Verify 3:1 ratio for large text (18px+)
  - Verify 3:1 ratio for focus indicators
  - Test in both dark and light modes
  - _Requirements: 16.1-16.5_

- [ ] 11.5 Write property test for color contrast
  - **Property 26: Color Contrast Meets WCAG AA**
  - **Validates: Requirements 16.1-16.5**

- [ ] 11.6 Add focus indicators
  - Implement visible focus outline on all interactive elements
  - Use 2px outline with 2px offset
  - Use rose gold color for focus indicator
  - Ensure focus indicator is visible on all backgrounds
  - _Requirements: 16.3, 17.3_

- [ ] 11.7 Implement semantic HTML structure
  - Use header element for navbar
  - Use nav element for navigation
  - Use main element for main content
  - Use section elements for content sections
  - Use article elements for cards
  - Use footer element for footer
  - Use h1 for main headline
  - Use h2 for section titles
  - Use h3 for card titles
  - _Requirements: 22.1-22.3_

- [ ] 11.8 Add meta tags and Open Graph
  - Add meta description tag
  - Add meta keywords tag
  - Add meta viewport tag
  - Add Open Graph tags (og:title, og:description, og:image)
  - Add canonical URL tag
  - _Requirements: 22.5-22.6_

- [ ] 11.9 Add image alt text
  - Add descriptive alt text to all images
  - Add alt text to gallery images
  - Add alt text to service icons
  - Ensure alt text is meaningful and concise
  - _Requirements: 22.7_

- [ ] 11.10 Test with screen readers
  - Test with NVDA (Windows)
  - Test with JAWS (Windows)
  - Test with VoiceOver (macOS/iOS)
  - Verify all content is readable
  - Verify all interactive elements are accessible
  - _Requirements: 17.1-17.7_



## Phase 12: Performance Optimization

- [ ] 12.1 Optimize images
  - Convert images to WebP format
  - Create fallback JPEG versions
  - Compress images to reduce file size
  - Implement responsive image sizes (srcset)
  - Ensure total image size < 2MB
  - _Requirements: 20.5, 21.1-21.5_

- [ ] 12.2 Implement code splitting
  - Lazy load feature components
  - Separate bundle for animations
  - Separate bundle for particles
  - Implement route-based code splitting
  - _Requirements: 20.1-20.5_

- [ ] 12.3 Optimize bundle size
  - Remove unused dependencies
  - Optimize Tailwind CSS output (purge unused styles)
  - Minify CSS and JavaScript
  - Enable gzip compression
  - Implement tree-shaking
  - _Requirements: 20.1-20.5_

- [ ] 12.4 Implement lazy loading for images
  - Use IntersectionObserver for lazy loading
  - Load images when they enter viewport
  - Show placeholder while loading
  - Implement progressive image loading
  - _Requirements: 7.10, 21.1-21.5_

- [ ] 12.5 Monitor Core Web Vitals
  - Measure Largest Contentful Paint (LCP)
  - Measure Cumulative Layout Shift (CLS)
  - Measure First Input Delay (FID)
  - Ensure LCP < 2.5 seconds
  - Ensure CLS < 0.1
  - _Requirements: 20.4-20.5_

- [ ] 12.6 Optimize animation performance
  - Use GPU-accelerated properties (transform, opacity)
  - Avoid layout-triggering properties
  - Debounce scroll events
  - Disable animations on low-end devices
  - Use requestAnimationFrame for smooth animations
  - _Requirements: 13.9-13.10_

- [ ] 12.7 Test page load time
  - Test on 4G connection (target < 3 seconds)
  - Test on desktop connection (target < 2 seconds)
  - Verify critical content visible within 1.5 seconds
  - Use Lighthouse for performance audit
  - _Requirements: 20.1-20.5_



## Phase 13: Testing & Quality Assurance

- [ ] 13.1 Write unit tests for services
  - Test ThemeService toggle and persistence
  - Test BookingService form validation
  - Test NotificationService notifications
  - Test NavigationService scroll and menu state
  - Test GalleryService lightbox state
  - _Requirements: 24.1-24.8_

- [ ] 13.2 Write component tests
  - Test Navbar component rendering and interactions
  - Test Hero component animations
  - Test Services component grid layout
  - Test Pricing component layout
  - Test Gallery component layout
  - Test Booking component form handling
  - Test Footer component rendering
  - _Requirements: 24.1-24.8_

- [ ] 13.3 Write integration tests
  - Test page load performance (< 3 seconds on 4G)
  - Test scroll-triggered animations
  - Test form submission flow
  - Test notification display
  - Test image lazy loading
  - Test theme persistence across page reload
  - _Requirements: 20.1-20.5, 25.1-25.4_

- [ ] 13.4 Write accessibility tests
  - Test WCAG 2.1 AA compliance
  - Test keyboard navigation
  - Test screen reader compatibility
  - Test color contrast ratios
  - Test focus indicators
  - Test semantic HTML structure
  - _Requirements: 16.1-16.5, 17.1-17.7, 22.1-22.8_

- [ ] 13.5 Write performance tests
  - Test Lighthouse score (target > 90)
  - Test LCP metric (target < 2.5 seconds)
  - Test CLS metric (target < 0.1)
  - Test animation frame rate (target 60fps)
  - Test bundle size
  - _Requirements: 20.1-20.5_

- [ ] 13.6 Test browser compatibility
  - Test on Chrome (latest)
  - Test on Firefox (latest)
  - Test on Safari (latest)
  - Test on Edge (latest)
  - Test on mobile browsers (iOS Safari, Chrome Mobile)
  - _Requirements: 23.1-23.5_



## Phase 14: Final Checkpoint & Documentation

- [ ] 14.1 Checkpoint - Ensure all tests pass
  - Run all unit tests
  - Run all integration tests
  - Run all accessibility tests
  - Run all performance tests
  - Verify all tests pass
  - Ask the user if questions arise

- [ ] 14.2 Create project documentation
  - Document project structure and architecture
  - Document component hierarchy
  - Document service interfaces
  - Document state management patterns
  - Document animation specifications
  - _Requirements: 24.1-24.8_

- [ ] 14.3 Create component documentation
  - Document each component's purpose and usage
  - Document component inputs and outputs
  - Document component styling and customization
  - Provide usage examples
  - _Requirements: 24.1-24.8_

- [ ] 14.4 Create setup and run instructions
  - Document installation steps
  - Document environment setup
  - Document development server startup
  - Document build process
  - Document deployment process
  - _Requirements: 24.1-24.8_

- [ ] 14.5 Prepare production build
  - Run production build
  - Verify build output
  - Test production build locally
  - Verify all assets are optimized
  - _Requirements: 20.1-20.5_

- [ ] 14.6 Setup deployment configuration
  - Configure hosting platform
  - Setup environment variables
  - Configure CDN for static assets
  - Setup SSL/HTTPS
  - Configure caching headers
  - _Requirements: 20.1-20.5_

- [ ] 14.7 Final checkpoint - Ensure all tests pass
  - Run all tests one final time
  - Verify production build
  - Verify all requirements met
  - Ask the user if questions arise

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All tasks build incrementally on previous work
- No orphaned code - all components are integrated into the final application

