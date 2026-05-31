import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export type LegalSection = 'privacy' | 'terms' | 'cookies';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
  <div
    *ngIf="isOpen()"
    class="fixed inset-0 z-[400] flex items-center justify-center p-4"
    (click)="close()"
    role="dialog"
    aria-modal="true"
  >
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

    <div
      class="relative w-full max-w-2xl max-h-[88vh] flex flex-col
             bg-[#0e0e10] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
      (click)="$event.stopPropagation()"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-white/[0.07] flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-rose-gold/15 border border-rose-gold/20 flex items-center justify-center">
            <lucide-icon [name]="activeIcon()" class="w-4 h-4 text-rose-gold"></lucide-icon>
          </div>
          <div>
            <h2 class="text-base font-bold text-luxelle leading-none">{{ activeTitle() }}</h2>
            <p class="text-[11px] text-luxelle-tertiary mt-0.5">Last updated: January 2025</p>
          </div>
        </div>
        <button
          (click)="close()"
          class="w-8 h-8 rounded-xl flex items-center justify-center text-luxelle-tertiary
                 hover:text-luxelle hover:bg-white/[0.07] transition-all duration-200"
          aria-label="Close"
        >
          <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 px-4 pt-4 pb-0 flex-shrink-0 border-b border-white/[0.05] pb-0">
        <button
          *ngFor="let tab of tabs"
          (click)="setActive(tab.id)"
          class="flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-all duration-200 -mb-px border-b-2"
          [ngClass]="active() === tab.id
            ? 'text-rose-gold border-rose-gold bg-rose-gold/[0.06]'
            : 'text-luxelle-tertiary border-transparent hover:text-luxelle hover:bg-white/[0.04]'"
        >
          <lucide-icon [name]="tab.icon" class="w-3.5 h-3.5"></lucide-icon>
          {{ tab.label }}
        </button>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto px-6 py-6 space-y-5 text-sm text-luxelle-secondary leading-relaxed">

        <!-- PRIVACY POLICY -->
        <ng-container *ngIf="active() === 'privacy'">
          <p class="text-luxelle-tertiary text-xs">
            At Luxelle Beauty &amp; Wellness, we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or book our services.
          </p>

          <div class="space-y-4">
            <div *ngFor="let section of privacySections" class="space-y-1.5">
              <h3 class="text-sm font-semibold text-luxelle flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-gold flex-shrink-0"></span>
                {{ section.title }}
              </h3>
              <p class="text-luxelle-tertiary text-[13px] leading-relaxed pl-3.5">{{ section.body }}</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-rose-gold/[0.06] border border-rose-gold/20 text-[12px] text-luxelle-secondary">
            <strong class="text-rose-gold">Contact our Privacy Team:</strong> privacy&#64;luxelle.com · +1 (234) 567-890
          </div>
        </ng-container>

        <!-- TERMS OF SERVICE -->
        <ng-container *ngIf="active() === 'terms'">
          <p class="text-luxelle-tertiary text-xs">
            These Terms of Service govern your use of Luxelle Beauty &amp; Wellness services, website, and booking system. By booking an appointment or using our services, you agree to these terms in full.
          </p>

          <div class="space-y-4">
            <div *ngFor="let section of termsSections" class="space-y-1.5">
              <h3 class="text-sm font-semibold text-luxelle flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-gold flex-shrink-0"></span>
                {{ section.title }}
              </h3>
              <p class="text-luxelle-tertiary text-[13px] leading-relaxed pl-3.5">{{ section.body }}</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[12px] text-luxelle-tertiary">
            These terms were last reviewed January 2025. Continued use of our services after changes constitutes acceptance of updated terms.
          </div>
        </ng-container>

        <!-- COOKIE POLICY -->
        <ng-container *ngIf="active() === 'cookies'">
          <p class="text-luxelle-tertiary text-xs">
            Luxelle uses cookies and similar tracking technologies to enhance your experience on our website. This policy explains what cookies we use and why.
          </p>

          <div class="space-y-4">
            <div *ngFor="let section of cookieSections" class="space-y-1.5">
              <h3 class="text-sm font-semibold text-luxelle flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-gold flex-shrink-0"></span>
                {{ section.title }}
              </h3>
              <p class="text-luxelle-tertiary text-[13px] leading-relaxed pl-3.5">{{ section.body }}</p>
            </div>
          </div>

          <table class="w-full text-[11px] rounded-xl overflow-hidden border border-white/[0.08]">
            <thead>
              <tr class="bg-white/[0.04] border-b border-white/[0.06]">
                <th class="px-3 py-2 text-left font-semibold text-luxelle-secondary">Type</th>
                <th class="px-3 py-2 text-left font-semibold text-luxelle-secondary">Purpose</th>
                <th class="px-3 py-2 text-left font-semibold text-luxelle-secondary">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of cookieTable; let last = last"
                  [class.border-b]="!last"
                  class="border-white/[0.05]">
                <td class="px-3 py-2 text-luxelle-tertiary">{{ row.type }}</td>
                <td class="px-3 py-2 text-luxelle-tertiary">{{ row.purpose }}</td>
                <td class="px-3 py-2 text-luxelle-tertiary">{{ row.duration }}</td>
              </tr>
            </tbody>
          </table>
        </ng-container>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-white/[0.07] flex items-center justify-between flex-shrink-0 bg-white/[0.01]">
        <div class="flex items-center gap-1.5 text-[11px] text-luxelle-tertiary">
          <lucide-icon name="lock" class="w-3 h-3"></lucide-icon>
          Your privacy is our priority
        </div>
        <button
          (click)="close()"
          class="px-5 py-2 rounded-xl text-xs font-semibold border border-white/[0.1]
                 text-luxelle-tertiary hover:border-rose-gold/40 hover:text-rose-gold
                 transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  `,
})
export class LegalModalComponent {
  isOpen = signal(false);
  active = signal<LegalSection>('privacy');

  tabs: { id: LegalSection; label: string; icon: string }[] = [
    { id: 'privacy',  label: 'Privacy Policy',    icon: 'shield-check' },
    { id: 'terms',    label: 'Terms of Service',  icon: 'file-text' },
    { id: 'cookies',  label: 'Cookie Policy',     icon: 'info' },
  ];

  activeTitle = computed(() =>
    ({ privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Policy' }[this.active()])
  );

  activeIcon = computed(() =>
    ({ privacy: 'shield-check', terms: 'file-text', cookies: 'info' }[this.active()])
  );

  privacySections = [
    { title: 'Information We Collect', body: 'We collect personal information you provide directly, including your name, email address, phone number, and appointment preferences when you book a service. We also collect technical data such as IP address, browser type, and pages visited through cookies and analytics tools.' },
    { title: 'How We Use Your Information', body: 'Your information is used exclusively to manage bookings, send appointment reminders and confirmations, process payments securely via Stripe, and improve our services. We never sell your personal data to third parties.' },
    { title: 'Data Storage & Security', body: 'All personal data is stored securely using industry-standard encryption. Payment information is processed by Stripe and never stored on our servers. We retain booking records for up to 3 years for legal and service quality purposes.' },
    { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications, request data portability, or withdraw consent for data processing by contacting us at privacy@luxelle.com.' },
    { title: 'Third-Party Services', body: 'We use Stripe for payment processing, Google Analytics for website insights, and email service providers for appointment communications. Each third party has its own privacy policy and data practices.' },
    { title: 'Changes to This Policy', body: 'We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our website. Continued use of our services after changes constitutes acceptance.' },
  ];

  termsSections = [
    { title: 'Appointments & Booking', body: 'Appointments are subject to availability and confirmed only upon receipt of a booking confirmation. We reserve the right to reschedule appointments due to staff availability or unforeseen circumstances, with advance notice where possible.' },
    { title: 'Cancellation Policy', body: 'Cancellations must be made at least 24 hours before your scheduled appointment. Late cancellations or no-shows may incur a fee of up to 50% of the service price. We understand emergencies happen — please contact us as soon as possible.' },
    { title: 'Payments', body: 'Payment is due at the time of service. We accept all major credit and debit cards processed securely via Stripe. Prices are subject to change. Any applicable taxes are included in the displayed price.' },
    { title: 'Health & Safety', body: 'Please inform us of any allergies, medical conditions, or skin sensitivities before your appointment. Luxelle reserves the right to decline or modify services if a client\'s health or safety may be at risk.' },
    { title: 'Satisfaction Guarantee', body: 'We strive to deliver exceptional service on every visit. If you are not satisfied with your treatment, please let us know within 48 hours and we will work with you to resolve the issue or offer a complimentary adjustment.' },
    { title: 'Intellectual Property', body: 'All content on the Luxelle website, including images, text, logos, and design elements, is owned by Luxelle Beauty & Wellness and protected by copyright law. Reproduction without written consent is prohibited.' },
    { title: 'Limitation of Liability', body: 'Luxelle Beauty & Wellness is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the relevant service.' },
  ];

  cookieSections = [
    { title: 'What Are Cookies', body: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, analyze site traffic, and provide a personalized experience.' },
    { title: 'Essential Cookies', body: 'These cookies are necessary for the website to function correctly. They enable core features like secure login sessions, booking form state, and shopping cart functionality. You cannot opt out of essential cookies.' },
    { title: 'Analytics Cookies', body: 'We use analytics cookies to understand how visitors interact with our website. This data helps us improve our content and services. Analytics data is aggregated and anonymized.' },
    { title: 'Marketing Cookies', body: 'With your consent, we may use marketing cookies to show you relevant Luxelle promotions and offers. You can opt out of marketing cookies at any time through your browser settings.' },
    { title: 'Managing Cookies', body: 'You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website and booking system.' },
  ];

  cookieTable = [
    { type: 'Essential',  purpose: 'Session & booking',       duration: 'Session' },
    { type: 'Analytics',  purpose: 'Usage statistics',        duration: '2 years' },
    { type: 'Preference', purpose: 'Theme & language',        duration: '1 year'  },
    { type: 'Marketing',  purpose: 'Targeted promotions',     duration: '90 days' },
  ];

  open(page: LegalSection = 'privacy') {
    this.active.set(page);
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen.set(false);
    document.body.style.overflow = '';
  }

  setActive(page: LegalSection) {
    this.active.set(page);
  }
}
