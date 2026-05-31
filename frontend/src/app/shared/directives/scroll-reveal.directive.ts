import { Directive, ElementRef, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  animationType = input<'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight'>('fadeInUp');

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupObserver(): void {
    const options: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.revealElement();
          if (this.observer) {
            this.observer.unobserve(entry.target);
          }
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private revealElement(): void {
    const element = this.el.nativeElement;
    const animationType = this.animationType();

    element.style.opacity = '0';

    switch (animationType) {
      case 'fadeInUp':
        element.style.transform = 'translateY(20px)';
        element.animate(
          [
            { opacity: '0', transform: 'translateY(20px)' },
            { opacity: '1', transform: 'translateY(0)' },
          ],
          { duration: 600, easing: 'ease-out', fill: 'forwards' }
        );
        break;
      case 'fadeIn':
        element.animate(
          [{ opacity: '0' }, { opacity: '1' }],
          { duration: 400, easing: 'ease-out', fill: 'forwards' }
        );
        break;
      case 'slideInLeft':
        element.style.transform = 'translateX(-20px)';
        element.animate(
          [
            { opacity: '0', transform: 'translateX(-20px)' },
            { opacity: '1', transform: 'translateX(0)' },
          ],
          { duration: 500, easing: 'ease-out', fill: 'forwards' }
        );
        break;
      case 'slideInRight':
        element.style.transform = 'translateX(20px)';
        element.animate(
          [
            { opacity: '0', transform: 'translateX(20px)' },
            { opacity: '1', transform: 'translateX(0)' },
          ],
          { duration: 500, easing: 'ease-out', fill: 'forwards' }
        );
        break;
    }
  }
}
