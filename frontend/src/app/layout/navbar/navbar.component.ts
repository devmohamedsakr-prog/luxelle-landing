import { Component, OnInit, OnDestroy, inject, signal, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthModalComponent } from '../../shared/components/ui/auth-modal/auth-modal.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { NAVIGATION_LINKS } from '../../core/constants/app.constants';
import { LucideAngularModule, Moon, Sun, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ButtonComponent, LucideAngularModule, AuthModalComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  cartService           = inject(CartService);
  authService           = inject(AuthService);

  @ViewChild(AuthModalComponent) authModal!: AuthModalComponent;

  navigationLinks  = NAVIGATION_LINKS;
  isScrolled       = signal(false);
  isMobileMenuOpen = signal(false);
  isDark           = signal(true);
  showUserMenu     = signal(false);

  private readonly scrollHandler = () => {
    this.isScrolled.set(window.scrollY > 50);
  };

  ngOnInit(): void {
    this.isDark.set(this.themeService.isDarkMode());
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-user-menu]')) {
      this.showUserMenu.set(false);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDark.set(this.themeService.isDarkMode());
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((value) => !value);
  }

  toggleUserMenu(e: MouseEvent): void {
    e.stopPropagation();
    this.showUserMenu.update(v => !v);
  }

  openLogin(): void {
    this.showUserMenu.set(false);
    this.authModal.open('login');
  }

  openRegister(): void {
    this.showUserMenu.set(false);
    this.authModal.open('register');
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu.set(false);
  }

  scrollToBooking(): void {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    this.isMobileMenuOpen.set(false);
  }
}
