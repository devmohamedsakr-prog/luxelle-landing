import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms ease-out', style({ opacity: 1 })),
  ]),
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

export const staggerAnimation = trigger('stagger', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ], { optional: true }),
  ]),
]);

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({ height: '0', opacity: '0', overflow: 'hidden' })),
  state('expanded', style({ height: '*', opacity: '1', overflow: 'visible' })),
  transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
]);

export const rotateIn = trigger('rotateIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'rotate(-10deg)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'rotate(0)' })),
  ]),
]);
