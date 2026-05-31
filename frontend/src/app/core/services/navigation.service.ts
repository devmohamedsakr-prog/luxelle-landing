import { Injectable, signal, computed, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnDestroy {
  mobileMenuOpen  = signal(false);
  scrollPosition  = signal(0);
  navbarScrolled  = computed(() => this.scrollPosition() > 50);

  private readonly scrollHandler = () => {
    this.scrollPosition.set(window.scrollY);
  };

  constructor() {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openMobileMenu(): void {
    this.mobileMenuOpen.set(true);
  }

  updateScrollPosition(): void {
    this.scrollPosition.set(window.scrollY);
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMobileMenu();
  }
}
