import { ISourceOptions } from 'tsparticles-engine';

export const particlesConfig: ISourceOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ['#E8B4BC', '#D4AF37'],
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: {
        min: 0.3,
        max: 0.6,
      },
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.3,
        sync: false,
      },
    },
    size: {
      value: {
        min: 2,
        max: 4,
      },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 2,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: false,
      straight: false,
      outModes: {
        default: 'out',
      },
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
    links: {
      enable: false,
    },
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      onClick: {
        enable: false,
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  background: {
    color: 'transparent',
  },
  fullScreen: {
    enable: false,
    zIndex: 1,
  },
  detectRetina: true,
  fpsLimit: 60,
};
